import React from 'react';
import { User, Briefcase, FileText, Landmark, Info } from 'lucide-react';

export default function MetadataContext({ 
  employee, setEmployee, 
  customer, setCustomer, 
  claimInfo, setClaimInfo, 
  benefitInfo, setBenefitInfo 
}) {
  return (
    <div className="card shadow-sm glass-3d-card mb-4">
      <div className="card-header bg-dark text-white py-2 d-flex justify-content-between align-items-center" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
        <span className="small text-uppercase fw-bold d-flex align-items-center gap-1">
          <Info size={14} /> Metadata Reference Context
        </span>
        <span className="badge bg-secondary-subtle text-dark rounded-pill">Active Session Info</span>
      </div>
      <div className="card-body p-4">
        
        {/* Top Section: Employee & Customer Details */}
        <div className="row g-3 mb-3 pb-3">
          {/* Employee Section */}
          <div className="col-12 col-lg-6">
            <div className="glass-3d-card p-3 h-100">
              <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center gap-2">
                <User size={16} className="text-dark" /> Employee Profile
              </h6>
              <div className="row g-2">
                <div className="col-5">
                  <label className="small text-muted mb-1">First Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={employee.firstName || ""} 
                    onChange={(e) => setEmployee({...employee, firstName: e.target.value})} 
                  />
                </div>
                <div className="col-2">
                  <label className="small text-muted mb-1">MI</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold text-center glass-input" 
                    value={employee.mi || ""} 
                    onChange={(e) => setEmployee({...employee, mi: e.target.value})} 
                  />
                </div>
                <div className="col-5">
                  <label className="small text-muted mb-1">Last Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={employee.lastName || ""} 
                    onChange={(e) => setEmployee({...employee, lastName: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">SSN / FEIN</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={employee.ssn || ""} 
                    onChange={(e) => setEmployee({...employee, ssn: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Date of Birth (DOB)</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={employee.dob || ""} 
                    onChange={(e) => setEmployee({...employee, dob: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Customer Section */}
          <div className="col-12 col-lg-6">
            <div className="glass-3d-card p-3 h-100">
              <h6 className="text-muted text-uppercase fw-bold mb-3 d-flex align-items-center gap-2">
                <Briefcase size={16} className="text-dark" /> Customer Accounts
              </h6>
              <div className="row g-2">
                <div className="col-8">
                  <label className="small text-muted mb-1">Company Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.name || ""} 
                    onChange={(e) => setCustomer({...customer, name: e.target.value})} 
                  />
                </div>
                <div className="col-4">
                  <label className="small text-muted mb-1">Customer ID</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.id || ""} 
                    onChange={(e) => setCustomer({...customer, id: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Sub Division Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.subName || ""} 
                    onChange={(e) => setCustomer({...customer, subName: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Sub Division Code</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.subCode || ""} 
                    onChange={(e) => setCustomer({...customer, subCode: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Location Name</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.locName || ""} 
                    onChange={(e) => setCustomer({...customer, locName: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Location Code</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={customer.locCode || ""} 
                    onChange={(e) => setCustomer({...customer, locCode: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Heading: Claim Information */}
        <div className="mt-4 mb-3 pt-3">
          <h6 className="fw-bold text-dark text-uppercase small d-flex align-items-center gap-2">
            <FileText size={16} className="text-secondary" /> Claim Information
          </h6>
        </div>

        {/* Bottom Section: Claim Info & Benefit Info Redesigned into 3 Equal Cards */}
        <div className="row g-3">
          {/* Card 1: Claim Identifiers */}
          <div className="col-12 col-md-4">
            <div className="glass-3d-card p-3 h-100">
              <h6 className="text-muted text-uppercase fw-bold mb-3 small d-flex align-items-center gap-2">
                <span className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px', fontSize: '10px' }}>1</span>
                Claim Identifiers
              </h6>
              <div className="row g-2">
                <div className="col-12">
                  <label className="small text-muted mb-1">Claim Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.claimNumber || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, claimNumber: e.target.value})} 
                  />
                </div>
                <div className="col-12">
                  <label className="small text-muted mb-1">Assoc Claim Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.assocClaimNumber || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, assocClaimNumber: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Timeline & Status */}
          <div className="col-12 col-md-4">
            <div className="glass-3d-card p-3 h-100">
              <h6 className="text-muted text-uppercase fw-bold mb-3 small d-flex align-items-center gap-2">
                <span className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px', fontSize: '10px' }}>2</span>
                Timeline & Status
              </h6>
              <div className="row g-2">
                <div className="col-6">
                  <label className="small text-muted mb-1">Disability Date</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.disabilityDate || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, disabilityDate: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Claim Status</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.claimStatus || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, claimStatus: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Product</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.product || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, product: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Office Number</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={claimInfo.officeNumber || ""} 
                    onChange={(e) => setClaimInfo({...claimInfo, officeNumber: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Benefit Details */}
          <div className="col-12 col-md-4">
            <div className="glass-3d-card p-3 h-100">
              <h6 className="text-muted text-uppercase fw-bold mb-3 small d-flex align-items-center gap-2">
                <span className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: '20px', height: '20px', fontSize: '10px' }}>3</span>
                Benefit Details
              </h6>
              <div className="row g-2">
                <div className="col-6">
                  <label className="small text-muted mb-1">Class</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={benefitInfo.class || ""} 
                    onChange={(e) => setBenefitInfo({...benefitInfo, class: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Funding Method</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={benefitInfo.funding || ""} 
                    onChange={(e) => setBenefitInfo({...benefitInfo, funding: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Banking Partner</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={benefitInfo.banking || ""} 
                    onChange={(e) => setBenefitInfo({...benefitInfo, banking: e.target.value})} 
                  />
                </div>
                <div className="col-6">
                  <label className="small text-muted mb-1">Calculation Code</label>
                  <input 
                    type="text" 
                    className="form-control form-control-sm font-monospace fw-bold glass-input" 
                    value={benefitInfo.calcs || ""} 
                    onChange={(e) => setBenefitInfo({...benefitInfo, calcs: e.target.value})} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}