import React from 'react';
import { Play, Trash2, Calendar, ClipboardList, AlertCircle } from 'lucide-react';

export default function WipList({ wipList, onDelete, onLoad }) {
  return (
    <div className="glass-3d-card p-3">
      <div className="d-flex justify-content-between align-items-center mb-3 pb-2">
        <h5 className="fw-bold text-dark mb-0 d-flex align-items-center gap-2">
          <ClipboardList size={18} className="text-secondary" /> Work in Progress (WIP) List
        </h5>
        <span className="badge bg-secondary-subtle text-dark px-3 py-2 fw-bold">
          Active Drafts: {wipList.length}
        </span>
      </div>

      {wipList.length === 0 ? (
        <div className="text-center py-5 text-muted">
          <AlertCircle size={32} className="mb-2 text-warning" />
          <p className="mb-0 fw-semibold">No drafts currently in progress.</p>
          <small className="text-muted">Use "Save Draft to WIP" below the letter selection panel to save items here.</small>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th className="small text-uppercase">Claim #</th>
                <th className="small text-uppercase">Employee</th>
                <th className="small text-uppercase">Letter Model</th>
                <th className="small text-uppercase">Recipient</th>
                <th className="small text-uppercase">Method</th>
                <th className="small text-uppercase">Date Created</th>
                <th className="small text-uppercase text-center">Status</th>
                <th className="small text-uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wipList.map((item) => (
                <tr key={item.id}>
                  <td className="font-monospace fw-bold small">{item.claimNumber}</td>
                  <td className="small fw-semibold">{item.employee}</td>
                  <td className="small text-truncate font-monospace" style={{ maxWidth: '160px' }}>
                    {item.letter}
                  </td>
                  <td className="small text-truncate" style={{ maxWidth: '120px' }}>
                    {item.recipient}
                  </td>
                  <td className="small">
                    <span className="badge bg-light text-dark border">
                      {item.channel}
                    </span>
                  </td>
                  <td className="small text-muted font-monospace">
                    <Calendar size={12} className="me-1" />
                    {item.date}
                  </td>
                  <td className="text-center">
                    <span className={`badge ${
                      item.status === 'Completed' ? 'bg-success' : 
                      item.status === 'Pending Approval' ? 'bg-warning text-dark' : 'bg-primary'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="d-flex justify-content-center gap-2">
                      <button 
                        className="btn btn-sm btn-dark d-flex align-items-center gap-1 fw-bold"
                        style={{ fontSize: '11px', padding: '4px 8px' }}
                        onClick={() => onLoad(item)}
                        title="Load Draft into Editor"
                      >
                        <Play size={12} fill="white" />
                        <span>Load</span>
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                        style={{ padding: '4px 8px' }}
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this WIP draft?")) {
                            onDelete(item.id);
                          }
                        }}
                        title="Delete Draft"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
