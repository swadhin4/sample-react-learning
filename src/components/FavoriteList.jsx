import React, { useState } from 'react';
import { Star, Trash2, Plus } from 'lucide-react';

export default function FavoriteList({ 
  category, setCategory, 
  letter, setLetter, 
  favorites, addToFavorites, removeFromFavorites 
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const isCurrentSelectionFavorite = favorites.some(
    fav => fav.category === category && fav.letter === letter
  );

  // Filter favorites by category or letter model match
  const filteredFavorites = favorites.filter(fav =>
    fav.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fav.letter.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="d-flex flex-column h-100 glass-3d-card p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-bold mb-0 d-flex align-items-center gap-2">
          <Star size={16} className="text-warning fill-warning" /> Favorites List
        </h6>
        <span className="badge bg-secondary-subtle text-dark">Quick Select</span>
      </div>

      {/* Autocomplete Search Bar */}
      <input
        type="text"
        className="form-control form-control-sm mb-2 glass-input font-monospace fw-semibold"
        placeholder="🔍 Search Favorites..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="table-responsive bg-white rounded border flex-grow-1 mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
        <table className="table table-hover table-sm mb-0">
          <thead className="table-light">
            <tr>
              <th className="small text-uppercase">Category</th>
              <th className="small text-uppercase">Letter Model</th>
              <th className="small text-uppercase text-center" style={{ width: '40px' }}>Remove</th>
            </tr>
          </thead>
          <tbody>
            {filteredFavorites.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center text-muted italic small py-3">
                  No matching favorites.
                </td>
              </tr>
            ) : (
              filteredFavorites.map((fav, idx) => {
                const active = category === fav.category && letter === fav.letter;
                return (
                  <tr 
                    key={idx} 
                    style={{ cursor: 'pointer' }} 
                    className={active ? 'table-secondary fw-bold' : ''}
                  >
                    <td 
                      className="small text-truncate" 
                      onClick={() => { setCategory(fav.category); setLetter(fav.letter); }}
                    >
                      {fav.category}
                    </td>
                    <td 
                      className="small text-truncate text-dark" 
                      onClick={() => { setCategory(fav.category); setLetter(fav.letter); }}
                    >
                      {fav.letter}
                    </td>
                    <td className="text-center">
                      <button 
                        className="btn btn-link text-danger p-0" 
                        onClick={(e) => { 
                          e.stopPropagation(); 
                          removeFromFavorites(fav.category, fav.letter); 
                          if (active) {
                            setCategory("");
                            setLetter("");
                          }
                        }}
                      >
                        <Trash2 size={12} />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="w-100">
        <button 
          className="btn btn-outline-danger btn-sm fw-bold w-100"
          disabled={!category || !letter || !isCurrentSelectionFavorite}
          onClick={() => {
            removeFromFavorites(category, letter);
            setCategory("");
            setLetter("");
          }}
          style={{ fontSize: '11px' }}
        >
          Remove Selected Favorite
        </button>
      </div>
    </div>
  );
}