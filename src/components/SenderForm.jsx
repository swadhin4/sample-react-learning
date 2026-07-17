import React, { useState } from 'react';
import { UserCheck, Edit3, RotateCcw, MapPin, Paperclip } from 'lucide-react';

export default function SenderForm({ senderInfo, setSenderInfo }) {
  const [isEditing, setIsEditing] = useState(false);

  // Local state for editing user details so they can be saved/cancelled
  const [localDetails, setLocalDetails] = useState({
    firstName: senderInfo.firstName,
    lastName: senderInfo.lastName,
    title: senderInfo.title
  });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setSenderInfo({
        ...senderInfo,
        firstName: localDetails.firstName,
        lastName: localDetails.lastName,
        title: localDetails.title
      });
    }
    setIsEditing(!isEditing);
  };

  const handleReset = () => {
    const defaultDetails = {
      firstName: "Sample Learning 98",
      lastName: "Sample Learning 99",
      title: "Sample Learning 100"
    };
    setLocalDetails(defaultDetails);
    setSenderInfo({
      ...senderInfo,
      ...defaultDetails
    });
    setIsEditing(false);
  };

  return (
    <div className="glass-3d-card p-3 mt-3">
      <h6 className="fw-bold text-muted text-uppercase mb-3 small d-flex align-items-center gap-1">
        <UserCheck size={16} /> Sender Details
      </h6>

      <div className="row g-3">
        {/* Left Side: Sender Radios & On Behalf */}
        <div className="col-12 col-md-5 border-end-md pe-md-4">
          <label className="text-uppercase fw-bold text-secondary small mb-2 d-block">Sender Type</label>
          <div className="d-flex gap-3 mb-3">
            {['Self', 'DCM', 'Other'].map((t) => (
              <div key={t} className="form-check">
                <input 
                  type="radio" 
                  className="form-check-input border-secondary" 
                  id={`sender-${t}`} 
                  name="senderType" 
                  checked={senderInfo.senderType === t}
                  onChange={() => setSenderInfo({ ...senderInfo, senderType: t })}
                />
                <label className="form-check-label small fw-bold text-dark" htmlFor={`sender-${t}`}>
                  {t}
                </label>
              </div>
            ))}
          </div>

          <div>
            <label className="text-uppercase fw-bold text-secondary small mb-1 d-block">On Behalf of Name</label>
            <div className="input-group">
              <input 
                type="text" 
                className="form-control form-control-sm glass-input font-monospace" 
                placeholder="Name if not Self" 
                value={senderInfo.onBehalfName || ""}
                onChange={(e) => setSenderInfo({ ...senderInfo, onBehalfName: e.target.value })}
                disabled={senderInfo.senderType === 'Self'}
              />
              <button 
                className="btn btn-dark btn-sm fw-bold px-3" 
                type="button"
                disabled={senderInfo.senderType === 'Self'}
                onClick={() => alert(`Searching for: ${senderInfo.onBehalfName}`)}
              >
                Search
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: User Details */}
        <div className="col-12 col-md-7 ps-md-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <label className="text-uppercase fw-bold text-secondary small mb-0 d-block">User Details</label>
            <div className="d-flex gap-2">
              <button 
                type="button" 
                className={`btn btn-xs fw-bold d-flex align-items-center gap-1 ${isEditing ? 'btn-success text-white' : 'btn-outline-dark'}`}
                style={{ fontSize: '11px', padding: '2px 8px' }}
                onClick={handleEditToggle}
              >
                <Edit3 size={11} />
                <span>{isEditing ? "Save" : "Edit"}</span>
              </button>
              <button 
                type="button" 
                className="btn btn-xs btn-outline-danger fw-bold d-flex align-items-center gap-1"
                style={{ fontSize: '11px', padding: '2px 8px' }}
                onClick={handleReset}
              >
                <RotateCcw size={11} />
                <span>Reset</span>
              </button>
            </div>
          </div>

          <div className="row g-2 mb-2">
            <div className="col-6">
              <label className="small text-muted mb-0" style={{ fontSize: '10px' }}>First Name</label>
              <input 
                type="text" 
                className="form-control form-control-sm font-monospace fw-bold glass-input" 
                value={isEditing ? localDetails.firstName : senderInfo.firstName}
                onChange={(e) => setLocalDetails({ ...localDetails, firstName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="col-6">
              <label className="small text-muted mb-0" style={{ fontSize: '10px' }}>Last Name</label>
              <input 
                type="text" 
                className="form-control form-control-sm font-monospace fw-bold glass-input" 
                value={isEditing ? localDetails.lastName : senderInfo.lastName}
                onChange={(e) => setLocalDetails({ ...localDetails, lastName: e.target.value })}
                disabled={!isEditing}
              />
            </div>
            <div className="col-12">
              <label className="small text-muted mb-0" style={{ fontSize: '10px' }}>Title</label>
              <input 
                type="text" 
                className="form-control form-control-sm font-monospace fw-bold glass-input" 
                value={isEditing ? localDetails.title : senderInfo.title}
                onChange={(e) => setLocalDetails({ ...localDetails, title: e.target.value })}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Return Address & Enclosures Section */}
      <div className="pt-3 mt-3">
        <div className="row g-3">
          <div className="col-12 col-md-7">
            <label className="text-uppercase fw-bold text-secondary small mb-1 d-block d-flex align-items-center gap-1">
              <MapPin size={13} /> Return Address
            </label>
            <textarea 
              rows={2}
              className="form-control form-control-sm font-monospace fw-semibold glass-input"
              value={senderInfo.returnAddress || ""}
              onChange={(e) => setSenderInfo({ ...senderInfo, returnAddress: e.target.value })}
              placeholder="Enter physical return address details..."
            />
          </div>
          <div className="col-12 col-md-5 d-flex flex-column justify-content-between">
            <div>
              <label className="text-uppercase fw-bold text-secondary small mb-1 d-block d-flex align-items-center gap-1">
                <Paperclip size={13} /> Enclosures
              </label>
              <select 
                className="form-select form-select-sm glass-input fw-bold"
                value={senderInfo.enclosure || "None"}
                onChange={(e) => setSenderInfo({ ...senderInfo, enclosure: e.target.value })}
              >
                <option value="None">None</option>
                <option value="Sample Learning 111">Sample Learning 111</option>
                <option value="Sample Learning 112">Sample Learning 112</option>
                <option value="Sample Learning 113">Sample Learning 113</option>
                <option value="Sample Learning 114">Sample Learning 114</option>
              </select>
            </div>
            
            <div className="form-check mt-3">
              <input 
                type="checkbox" 
                className="form-check-input border-secondary" 
                id="postageEnvelope" 
                checked={senderInfo.includePostage || false}
                onChange={(e) => setSenderInfo({ ...senderInfo, includePostage: e.target.checked })}
              />
              <label className="form-check-label small fw-bold text-dark" htmlFor="postageEnvelope">
                Include Postage Paid Envelope
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
