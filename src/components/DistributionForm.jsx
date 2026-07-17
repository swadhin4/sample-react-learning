import React from 'react';
import { Upload, Trash2, Plus, Paperclip, AlertCircle } from 'lucide-react';
import { DISTRIBUTION_METHODS } from '../constants';

export default function DistributionForm({ 
  isSelectionComplete, 
  customer, setCustomer,
  employee, setEmployee,
  recipientsList, selectedRecipientId, setSelectedRecipientId, addRecipientRow, updateRecipientRow, deleteRecipientRow,
  attachmentsList, selectedAttachmentId, setSelectedAttachmentId, addAttachmentFile, updateAttachmentRow, deleteAttachmentRow,
  notes, setNotes
}) {

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(f => {
        addAttachmentFile(f.name);
      });
    }
  };

  return (
    <div className="glass-3d-card p-4">
      {!isSelectionComplete && (
        <div className="alert alert-warning d-flex align-items-center gap-2 mb-4" role="alert">
          <AlertCircle size={18} />
          <div>
            <strong>Selection Incomplete:</strong> Please select a <strong>Category</strong> and <strong>Letter Model</strong> on the first tab to prepare the final dispatch package.
          </div>
        </div>
      )}

      {/* Row 1: Customer & Employee details */}
      <div className="row g-3 mb-4">
        {/* Customer Box */}
        <div className="col-12 col-lg-5">
          <div className="glass-3d-card p-3 h-100">
            <h6 className="text-muted text-uppercase fw-bold mb-3 small">Customer</h6>
            <div className="row g-2">
              <div className="col-12">
                <label className="small text-muted mb-1">* Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm font-monospace fw-bold glass-input"
                  value={customer.name || ""}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Employee details */}
        <div className="col-12 col-lg-7">
          <div className="glass-3d-card p-3 h-100">
            <h6 className="text-muted text-uppercase fw-bold mb-3 small">Employee</h6>
            <div className="row g-2">
              <div className="col-2">
                <label className="small text-muted mb-1">Prefix</label>
                <select 
                  className="form-select form-select-sm glass-input font-monospace fw-bold"
                  value={employee.prefix || ""}
                  onChange={(e) => setEmployee({ ...employee, prefix: e.target.value })}
                >
                  <option value="">None</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Ms.">Ms.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Dr.">Dr.</option>
                </select>
              </div>
              <div className="col-4">
                <label className="small text-muted mb-1">* First Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm font-monospace fw-bold glass-input"
                  value={employee.firstName || ""}
                  onChange={(e) => setEmployee({ ...employee, firstName: e.target.value })}
                />
              </div>
              <div className="col-2">
                <label className="small text-muted mb-1">MI</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm font-monospace fw-bold glass-input text-center"
                  maxLength={1}
                  value={employee.mi || ""}
                  onChange={(e) => setEmployee({ ...employee, mi: e.target.value })}
                />
              </div>
              <div className="col-4">
                <label className="small text-muted mb-1">* Last Name</label>
                <input 
                  type="text" 
                  className="form-control form-control-sm font-monospace fw-bold glass-input"
                  value={employee.lastName || ""}
                  onChange={(e) => setEmployee({ ...employee, lastName: e.target.value })}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Recipients Grid */}
      <div className="glass-3d-card p-3 mb-4">
        <h6 className="text-muted text-uppercase fw-bold mb-3 small">Recipients</h6>
        
        <div className="table-responsive bg-white rounded border mb-3" style={{ maxHeight: '250px' }}>
          <table className="table table-hover table-sm table-bordered align-middle mb-0" style={{ minWidth: '950px' }}>
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: '40px' }}>Sel</th>
                <th className="text-center" style={{ width: '50px' }}>PRM</th>
                <th className="text-center" style={{ width: '50px' }}>CC</th>
                <th style={{ width: '150px' }}>Method</th>
                <th style={{ width: '70px' }}>Prefix</th>
                <th>* First Name</th>
                <th style={{ width: '50px' }}>MI</th>
                <th>* Last Name</th>
                <th style={{ width: '70px' }}>Suffix</th>
                <th>Title</th>
                <th>Organization</th>
              </tr>
            </thead>
            <tbody>
              {recipientsList.length === 0 ? (
                <tr>
                  <td colSpan={11} className="text-center py-3 text-muted italic small">
                    No recipients configured. Click "Add Recipient" to insert a row.
                  </td>
                </tr>
              ) : (
                recipientsList.map((row) => (
                  <tr 
                    key={row.id} 
                    className={selectedRecipientId === row.id ? 'table-secondary' : ''}
                    onClick={() => setSelectedRecipientId(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="text-center">
                      <input 
                        type="radio" 
                        name="selectedRecipient" 
                        checked={selectedRecipientId === row.id} 
                        onChange={() => setSelectedRecipientId(row.id)}
                      />
                    </td>
                    <td className="text-center">
                      <input 
                        type="radio" 
                        name="primaryRecipient" 
                        checked={row.isPrimary} 
                        onChange={(e) => updateRecipientRow(row.id, 'isPrimary', e.target.checked)}
                      />
                    </td>
                    <td className="text-center">
                      <input 
                        type="checkbox" 
                        checked={row.isCC} 
                        disabled={row.isPrimary}
                        onChange={(e) => updateRecipientRow(row.id, 'isCC', e.target.checked)}
                      />
                    </td>
                    <td>
                      <select 
                        className="form-select form-select-sm glass-input font-monospace py-0 px-1 border-0"
                        value={row.method}
                        onChange={(e) => updateRecipientRow(row.id, 'method', e.target.value)}
                      >
                        {DISTRIBUTION_METHODS.map(m => (
                          <option key={m} value={m}>{m}</option>
                        ))}
                        <option value="Sample Learning 19">Sample Learning 19</option>
                      </select>
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace border-0 bg-transparent py-0 px-1"
                        value={row.prefix}
                        onChange={(e) => updateRecipientRow(row.id, 'prefix', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace fw-bold border-0 bg-transparent py-0 px-1"
                        value={row.firstName}
                        onChange={(e) => updateRecipientRow(row.id, 'firstName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace border-0 bg-transparent py-0 px-1 text-center"
                        maxLength={1}
                        value={row.mi}
                        onChange={(e) => updateRecipientRow(row.id, 'mi', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace fw-bold border-0 bg-transparent py-0 px-1"
                        value={row.lastName}
                        onChange={(e) => updateRecipientRow(row.id, 'lastName', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace border-0 bg-transparent py-0 px-1"
                        value={row.suffix}
                        onChange={(e) => updateRecipientRow(row.id, 'suffix', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace border-0 bg-transparent py-0 px-1"
                        value={row.title}
                        onChange={(e) => updateRecipientRow(row.id, 'title', e.target.value)}
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        className="form-control form-control-sm font-monospace border-0 bg-transparent py-0 px-1"
                        value={row.organization}
                        onChange={(e) => updateRecipientRow(row.id, 'organization', e.target.value)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2">
          <button 
            type="button" 
            className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-1 shadow-sm"
            onClick={addRecipientRow}
          >
            <Plus size={13} />
            <span>Add Recipient</span>
          </button>
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={deleteRecipientRow}
            disabled={!selectedRecipientId || recipientsList.length === 0}
          >
            <Trash2 size={13} />
            <span>Delete Recipient</span>
          </button>
        </div>
      </div>

      {/* Row 3: Attachments Grid */}
      <div className="glass-3d-card p-3 mb-3">
        <h6 className="text-muted text-uppercase fw-bold mb-3 small">Attachments</h6>
        
        <div className="table-responsive bg-white rounded border mb-3" style={{ maxHeight: '200px' }}>
          <table className="table table-hover table-sm table-bordered align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="text-center" style={{ width: '40px' }}>Sel</th>
                <th>Title</th>
                <th style={{ width: '120px' }}>No of Copies</th>
                <th style={{ width: '130px' }}>Source</th>
                <th style={{ width: '130px' }}>Category</th>
                <th>Author</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {attachmentsList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-3 text-muted italic small">
                    No attachments uploaded. Choose "Add Attachment" to select files.
                  </td>
                </tr>
              ) : (
                attachmentsList.map((row) => (
                  <tr 
                    key={row.id} 
                    className={selectedAttachmentId === row.id ? 'table-secondary' : ''}
                    onClick={() => setSelectedAttachmentId(row.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="text-center">
                      <input 
                        type="radio" 
                        name="selectedAttachment" 
                        checked={selectedAttachmentId === row.id} 
                        onChange={() => setSelectedAttachmentId(row.id)}
                      />
                    </td>
                    <td className="small font-monospace fw-bold">{row.title}</td>
                    <td>
                      <select 
                        className="form-select form-select-sm glass-input py-0 px-1 border-0 fw-bold"
                        value={row.copies}
                        onChange={(e) => updateAttachmentRow(row.id, 'copies', parseInt(e.target.value))}
                      >
                        {[1, 2, 3, 4, 5].map(n => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span className="badge bg-light text-dark border">{row.source}</span>
                    </td>
                    <td>
                      <span className="badge bg-secondary-subtle text-dark border-secondary-subtle px-2">
                        {row.category}
                      </span>
                    </td>
                    <td className="small text-muted">{row.author}</td>
                    <td className="small text-muted font-monospace">{row.created}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="d-flex gap-2">
          <label className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-1 shadow-sm mb-0 cursor-pointer">
            <Upload size={13} />
            <span>Add Attachment</span>
            <input type="file" multiple className="d-none" onChange={handleFileUpload} />
          </label>
          <button 
            type="button" 
            className="btn btn-outline-danger btn-sm fw-bold d-flex align-items-center gap-1"
            onClick={deleteAttachmentRow}
            disabled={!selectedAttachmentId || attachmentsList.length === 0}
          >
            <Trash2 size={13} />
            <span>Delete Attachment</span>
          </button>
        </div>
      </div>

      {/* Internal Dispatch Memo */}
      <div className="glass-3d-card p-3">
        <label className="text-uppercase fw-bold text-muted small mb-2 d-block">Internal Dispatch Memo</label>
        <textarea 
          rows={3} 
          className="form-control glass-input font-monospace small fw-semibold" 
          value={notes} 
          onChange={(e) => setNotes(e.target.value)} 
          placeholder="Special delivery annotations or internal memos..." 
        />
      </div>
    </div>
  );
}