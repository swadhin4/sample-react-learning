import { Heading } from '@digitools/honest-react';
import './ClaimInformationPage.css';

interface ClaimFieldProps {
  label: string;
  value: string;
}

function ClaimField({ label, value }: ClaimFieldProps) {
  return (
    <div className="claim-field">
      <div className="claim-field-label">{label}</div>
      <div className="claim-field-value">{value}</div>
    </div>
  );
}

export default function ClaimInformationPage() {
  return (
    <div className="claim-information-page">
      <div className="page-header">
        <Heading elementType="h1">Claim Information</Heading>
      </div>

      <section className="claim-summary">
        {/* Top heading */}
        <div className="claim-summary-header">
          <div className="claim-number">
            <span className="claim-number-label">Claim #</span>
            <span className="claim-number-value">123456</span>
          </div>

          <div className="leave-id-header">
            <span className="leave-id-label">Leave ID</span>
            <span className="leave-id-value">123456</span>
          </div>
        </div>

        {/* Information fields */}
        <div className="claim-fields-row">
          <ClaimField
            label="Product"
            value="LTC"
          />

          <ClaimField
            label="Claim Status"
            value="Closed"
          />

          <ClaimField
            label="Leave ID"
            value="00-00000"
          />

          <ClaimField
            label="Leave type/reason"
            value="Maternity"
          />

          <ClaimField
            label="Leave status"
            value="Closed"
          />

          <ClaimField
            label="Employee name"
            value="xyzabc"
          />

          <ClaimField
            label="Customer name"
            value="xyzabc"
          />

          <ClaimField
            label="Div-Serial"
            value="xyzabc"
          />

          <button
            type="button"
            className="search-button"
            onClick={() => {
              console.log('Search clicked');
            }}
          >
            <span className="search-icon">⌕</span>
            <span>Search</span>
          </button>
        </div>

        {/* Bottom navigation */}
        <div className="claim-navigation">
          <button
            type="button"
            className="claim-nav-item active"
          >
            Selection summary
          </button>

          <button
            type="button"
            className="claim-nav-item"
          >
            Letter
            <span className="nav-value">xyzabc</span>
          </button>

          <button
            type="button"
            className="claim-nav-item"
          >
            Category
            <span className="nav-value">xyzabc</span>
          </button>

          <button
            type="button"
            className="claim-nav-item"
          >
            Recipient
            <span className="nav-value">xyzabc</span>
          </button>

          <button
            type="button"
            className="claim-nav-item"
          >
            Distribution
            <span className="nav-value">xyzabc</span>
          </button>
        </div>
      </section>
    </div>
  );
}