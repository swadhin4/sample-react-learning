import React from 'react';
import Header from './components/Header';
import MetadataContext from './components/MetadataContext';
import LetterSelector from './components/LetterSelector';
import FavoriteList from './components/FavoriteList';
import DistributionForm from './components/DistributionForm';
import SenderForm from './components/SenderForm';
import WipList from './components/WipList';
import { Search, ClipboardList, Send, FileText } from 'lucide-react';
import { useApp } from './hooks/useApp';

export default function App() {
  const {
    claimNumber,
    searchQuery,
    setSearchQuery,
    loading,
    searchError,
    employee,
    setEmployee,
    customer,
    setCustomer,
    claimInfo,
    setClaimInfo,
    benefitInfo,
    setBenefitInfo,
    activeTab,
    setActiveTab,
    category,
    setCategory,
    letter,
    setLetter,
    favorites,
    addToFavorites,
    removeFromFavorites,
    senderInfo,
    setSenderInfo,
    recipientsList,
    selectedRecipientId,
    setSelectedRecipientId,
    addRecipientRow,
    updateRecipientRow,
    deleteRecipientRow,
    attachmentsList,
    selectedAttachmentId,
    setSelectedAttachmentId,
    addAttachmentFile,
    updateAttachmentRow,
    deleteAttachmentRow,
    notes,
    setNotes,
    wipList,
    addCorrespondenceToWip,
    loadWipItem,
    deleteWipItem,
    isSelectionComplete,
    handleSearch,
    handleReset
  } = useApp();

  if (!claimNumber) {
    return (
      <div className="min-h-screen d-flex flex-column bg-light text-dark">
        <Header claimNumber={claimNumber} onReset={handleReset} />
        <main className="container flex-grow-1 d-flex align-items-center justify-content-center my-5">
          <div className="card shadow glass-3d-card" style={{ width: '100%', maxWidth: '480px' }}>
            <div className="card-body p-4 p-md-5 text-center">
              <div className="bg-dark text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4 shadow" style={{ width: '64px', height: '64px' }}>
                <Search size={32} />
              </div>
              <h4 className="fw-extrabold text-dark mb-2">Retrieve Claim File</h4>
              <p className="text-muted small mb-4">
                Enter a claim number to fetch employee profile and customer metadata context from the DocuFlow database.
              </p>

              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
                <div className="input-group mb-3" style={{ border: 'none', overflow: 'hidden' }}>
                  <input
                    type="text"
                    className="form-control glass-input py-2 px-3 fw-bold font-monospace"
                    placeholder="e.g. CLM-7719"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    disabled={loading}
                    required
                  />
                  <button 
                    className="btn btn-dark px-4 fw-bold d-flex align-items-center gap-2" 
                    type="submit" 
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span>Searching...</span>
                      </>
                    ) : (
                      <span>Search</span>
                    )}
                  </button>
                </div>
              </form>

              {searchError && <div className="text-danger small mb-3 fw-bold">{searchError}</div>}

              <div className="border-top pt-4 mt-4">
                <span className="text-uppercase fw-bold text-muted small d-block mb-3" style={{ fontSize: '11px', letterSpacing: '0.5px' }}>
                  Quick-load Sample Claims
                </span>
                <div className="d-flex flex-column gap-2">
                  {[
                    { id: "CLM-7719", desc: "Sample Learning 22 Sample Learning 23 (Sample Learning 26)" },
                    { id: "CLM-8820", desc: "Sample Learning 41 Sample Learning 42 (Sample Learning 45)" },
                    { id: "CLM-9930", desc: "Sample Learning 60 Sample Learning 61 (Sample Learning 64)" }
                  ].map((claim) => (
                    <button
                      key={claim.id}
                      onClick={() => {
                        setSearchQuery(claim.id);
                        handleSearch(claim.id);
                      }}
                      disabled={loading}
                      className="btn btn-outline-secondary btn-sm text-start py-2 px-3 d-flex justify-content-between align-items-center"
                      style={{ borderRadius: '6px', borderStyle: 'dashed' }}
                    >
                      <span className="font-monospace fw-bold small">{claim.id}</span>
                      <span className="text-muted small" style={{ fontSize: '11px' }}>{claim.desc} &rarr;</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="bg-dark text-white-50 text-center py-3 border-top border-secondary">
          <small>DocuFlow System Core • Authorized Corporate Access Only</small>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen d-flex flex-column bg-light text-dark">
      <Header claimNumber={claimNumber} onReset={handleReset} />
      <main className="container my-4 flex-grow-1">
        
        {/* Metadata Context Component */}
        <MetadataContext 
          employee={employee} setEmployee={setEmployee}
          customer={customer} setCustomer={setCustomer}
          claimInfo={claimInfo} setClaimInfo={setClaimInfo}
          benefitInfo={benefitInfo} setBenefitInfo={setBenefitInfo}
        />

        {/* Tab Selection Navigation */}
        <ul className="nav nav-tabs mb-4 fw-bold border-bottom-2">
          <li className="nav-item">
            <button 
              className={`nav-link d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'correspondence' ? 'active bg-dark text-white' : 'text-dark bg-transparent border-0'}`} 
              onClick={() => setActiveTab('correspondence')}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            >
              <FileText size={16} />
              <span>Initiate & Edit Correspondence</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'recipients' ? 'active bg-dark text-white' : 'text-dark bg-transparent border-0'}`} 
              onClick={() => setActiveTab('recipients')}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            >
              <Send size={16} />
              <span>Recipients & Attachments</span>
            </button>
          </li>
          <li className="nav-item">
            <button 
              className={`nav-link d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'wip' ? 'active bg-dark text-white' : 'text-dark bg-transparent border-0'}`} 
              onClick={() => setActiveTab('wip')}
              style={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}
            >
              <ClipboardList size={16} />
              <span>WIP List</span>
            </button>
          </li>
        </ul>

        {/* Active Tab Workspace View */}
        <div className="tab-content">
          {activeTab === 'correspondence' && (
            <div className="row g-4">
              <div className="col-12 col-lg-7">
                <LetterSelector 
                  category={category} setCategory={setCategory}
                  letter={letter} setLetter={setLetter}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                />
                <SenderForm 
                  senderInfo={senderInfo} setSenderInfo={setSenderInfo}
                />
              </div>
              <div className="col-12 col-lg-5">
                <FavoriteList 
                  category={category} setCategory={setCategory}
                  letter={letter} setLetter={setLetter}
                  favorites={favorites}
                  addToFavorites={addToFavorites}
                  removeFromFavorites={removeFromFavorites}
                />
              </div>
            </div>
          )}

          {activeTab === 'recipients' && (
            <DistributionForm 
              isSelectionComplete={isSelectionComplete}
              customer={customer} setCustomer={setCustomer}
              employee={employee} setEmployee={setEmployee}
              recipientsList={recipientsList}
              selectedRecipientId={selectedRecipientId}
              setSelectedRecipientId={setSelectedRecipientId}
              addRecipientRow={addRecipientRow}
              updateRecipientRow={updateRecipientRow}
              deleteRecipientRow={deleteRecipientRow}
              attachmentsList={attachmentsList}
              selectedAttachmentId={selectedAttachmentId}
              setSelectedAttachmentId={setSelectedAttachmentId}
              addAttachmentFile={addAttachmentFile}
              updateAttachmentRow={updateAttachmentRow}
              deleteAttachmentRow={deleteAttachmentRow}
              notes={notes} setNotes={setNotes}
            />
          )}

          {activeTab === 'wip' && (
            <WipList 
              wipList={wipList}
              onDelete={deleteWipItem}
              onLoad={loadWipItem}
            />
          )}
        </div>

        {/* Global Dispatch Action Panel */}
        <div className="card shadow-sm border border-2 border-secondary mt-4 bg-white">
          <div className="card-body p-3 d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
            <div>
              <span className="small text-muted text-uppercase fw-bold d-block">Workspace Dispatch Center</span>
              <span className="fw-bold text-dark font-monospace">
                {isSelectionComplete ? `Selected: ${category} / ${letter}` : "Selection Incomplete (Choose a Letter model)"}
              </span>
            </div>
            <div className="d-flex gap-3">
              <button 
                type="button" 
                className="btn btn-outline-secondary fw-bold d-flex align-items-center gap-2"
                onClick={addCorrespondenceToWip}
                disabled={!isSelectionComplete}
              >
                <span>Save Draft to WIP</span>
              </button>
              <button 
                type="button" 
                className="btn btn-dark fw-bold d-flex align-items-center gap-2 px-4"
                disabled={!isSelectionComplete || recipientsList.length === 0 || !recipientsList.some(r => r.isPrimary)}
                onClick={() => alert("Correspondence generated and distributed successfully!")}
              >
                <span>Generate & Distribute</span>
              </button>
            </div>
          </div>
        </div>

      </main>
      <footer className="bg-dark text-white-50 text-center py-3 mt-auto border-top border-secondary">
        <small>DocuFlow System Core • Authorized Corporate Access Only</small>
      </footer>
    </div>
  );
}