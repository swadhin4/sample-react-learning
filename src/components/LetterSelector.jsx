import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { CATEGORIES_DATA } from '../constants';

export default function LetterSelector({ 
  category, setCategory, 
  letter, setLetter, 
  favorites, addToFavorites 
}) {
  const [catSearchQuery, setCatSearchQuery] = useState("");
  const [letSearchQuery, setLetSearchQuery] = useState("");

  // Filter categories based on query
  const filteredCategories = Object.keys(CATEGORIES_DATA).filter(cat =>
    cat.toLowerCase().includes(catSearchQuery.toLowerCase())
  );

  // Filter letters based on query
  const availableLetters = category ? CATEGORIES_DATA[category] : [];
  const filteredLetters = availableLetters.filter(letName =>
    letName.toLowerCase().includes(letSearchQuery.toLowerCase())
  );

  const isCurrentSelectionFavorite = favorites.some(
    fav => fav.category === category && fav.letter === letter
  );

  return (
    <div className="d-flex flex-column gap-3 glass-3d-card p-3">
      <div className="d-flex justify-content-between align-items-center mb-0">
        <h6 className="fw-bold text-muted text-uppercase mb-0 small">Letter Selection</h6>
        <button 
          className="btn btn-dark btn-sm fw-bold d-flex align-items-center gap-1 shadow-sm"
          disabled={!category || !letter || isCurrentSelectionFavorite}
          onClick={addToFavorites}
          style={{ fontSize: '11px' }}
        >
          <Plus size={12} /> Add to Favorites
        </button>
      </div>
      
      <div className="row g-3">
        {/* Category Listbox */}
        <div className="col-12 col-md-6">
          <label className="text-uppercase fw-bold text-secondary small mb-2 d-block">Category</label>
          
          {/* Autocomplete Search Bar */}
          <input
            type="text"
            className="form-control form-control-sm mb-2 glass-input font-monospace fw-semibold"
            placeholder="🔍 Search Category..."
            value={catSearchQuery}
            onChange={(e) => setCatSearchQuery(e.target.value)}
          />

          <select 
            size={5}
            value={category} 
            onChange={(e) => { 
              setCategory(e.target.value); 
              setLetter(""); 
              setLetSearchQuery(""); 
            }}
            className="form-select glass-input font-monospace p-2"
            style={{ borderRadius: '6px', minHeight: '130px', fontWeight: 'bold' }}
          >
            {filteredCategories.length === 0 ? (
              <option disabled className="p-2 text-muted italic">No categories match...</option>
            ) : (
              filteredCategories.map(cat => (
                <option key={cat} value={cat} className="p-2 border-bottom border-light">
                  {cat}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Letter Listbox */}
        <div className="col-12 col-md-6">
          <label className="text-uppercase fw-bold text-secondary small mb-2 d-block">
            Letter Model (Primary Recipient Eligible)
          </label>
          
          {/* Autocomplete Search Bar */}
          <input
            type="text"
            className="form-control form-control-sm mb-2 glass-input font-monospace fw-semibold"
            placeholder="🔍 Search Letter..."
            value={letSearchQuery}
            onChange={(e) => setLetSearchQuery(e.target.value)}
            disabled={!category}
          />

          <select 
            size={5}
            value={letter} 
            onChange={(e) => setLetter(e.target.value)}
            disabled={!category}
            className="form-select glass-input font-monospace p-2"
            style={{ 
              borderRadius: '6px', 
              minHeight: '130px', 
              fontWeight: 'bold',
              opacity: category ? 1 : 0.5 
            }}
          >
            {!category ? (
              <option disabled className="p-2 text-muted italic">Select a category first...</option>
            ) : filteredLetters.length === 0 ? (
              <option disabled className="p-2 text-muted italic">No letters match...</option>
            ) : (
              filteredLetters.map(letName => (
                <option key={letName} value={letName} className="p-2 border-bottom border-light">
                  {letName}
                </option>
              ))
            )}
          </select>
        </div>
      </div>
    </div>
  );
}