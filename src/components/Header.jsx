import React from 'react';
import { Layers, LogOut } from 'lucide-react';

export default function Header({ claimNumber, onReset }) {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-white border-bottom shadow-sm px-4 py-3">
      <div className="container-fluid d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 gap-md-0">
        <div className="d-flex align-items-center">
          <div className="bg-dark text-white rounded p-2 d-flex align-items-center justify-content-center me-3 shadow" style={{ width: '40px', height: '40px' }}>
            <Layers size={20} />
          </div>
          <div>
            <h4 className="mb-0 fw-extrabold text-dark tracking-tight">DocuFlow</h4>
            <span className="text-muted small fw-medium">Enterprise Communications Portal</span>
          </div>
        </div>

        {claimNumber && (
          <div className="d-flex align-items-center gap-2 bg-light border rounded px-3 py-1 shadow-sm">
            <span className="text-muted small fw-bold text-uppercase">Claim Context:</span>
            <span className="badge bg-dark font-monospace fs-6 px-2 py-1">{claimNumber}</span>
            <button className="btn btn-sm btn-outline-secondary ms-2 fw-bold" onClick={onReset} style={{ fontSize: '11px' }}>
              Change Claim
            </button>
          </div>
        )}
        <div className="d-flex align-items-center">
          <div className="d-none d-md-block text-end me-3 border-end pe-3">
            <span className="fw-semibold d-block text-dark small">Administrator Panel</span>
            <span className="text-success small d-flex align-items-center gap-1">
              <span className="bg-success rounded-circle" style={{ width: '6px', height: '6px', display: 'inline-block' }}></span>
              Secure Session Active
            </span>
          </div>
          <button className="btn d-flex align-items-center gap-2 text-white" style={{ backgroundColor: '#800000', border: 'none' }} onClick={() => alert('Terminating session...')}>
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
}