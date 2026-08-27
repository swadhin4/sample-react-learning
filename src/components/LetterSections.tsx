import React, { useState } from "react";
import "./LetterSelection.css";

interface LetterItem {
  id: number;
  category: string;
  letter: string;
}

const categories = [
  "Acknowledge",
  "Approve",
  "Request",
];

const letters: LetterItem[] = [
  {
    id: 1,
    category: "Acknowledge",
    letter: "Extending benefits",
  },
  {
    id: 2,
    category: "Acknowledge",
    letter: "PFML Acknowledgement",
  },
  {
    id: 3,
    category: "Acknowledge",
    letter: "PFML Acknowledgement",
  },
];

const favoriteLetters: LetterItem[] = [
  {
    id: 4,
    category: "Acknowledge",
    letter: "Extending benefits",
  },
  {
    id: 5,
    category: "Approve",
    letter: "Medical",
  },
  {
    id: 6,
    category: "Request",
    letter: "Medical clarification",
  },
  {
    id: 7,
    category: "Approve",
    letter: "No RTW",
  },
  {
    id: 8,
    category: "Acknowledge",
    letter: "PFML Acknowledgement",
  },
  {
    id: 9,
    category: "Request",
    letter: "Subsequent request",
  },
];

export default function LetterSelection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [selectedFavorite, setSelectedFavorite] = useState<number | null>(
    null
  );

  const filteredLetters = selectedCategory
    ? letters.filter((item) => item.category === selectedCategory)
    : letters;

  const handleAddFavorite = () => {
    if (selectedLetter !== null) {
      console.log("Add to favorites:", selectedLetter);
    }
  };

  const handleRemoveFavorite = () => {
    if (selectedFavorite !== null) {
      console.log("Remove from favorites:", selectedFavorite);
    }
  };

  return (
    <div className="letter-selection-page">
      <h1 className="page-title">Letter selection</h1>

      <div className="letter-selection-layout">
        {/* LEFT PANEL */}
        <section className="letter-panel">
          <div className="panel-title">Select by category</div>

          {/* Category dropdown */}
          <div className="category-select-wrapper">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select a category</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Letters */}
          <div className="letter-table">
            <div className="table-header">
              <div className="select-column">Select</div>
              <div className="category-column">Category</div>
              <div className="letter-column">Letter</div>
            </div>

            <div className="table-body">
              {filteredLetters.map((item) => (
                <div className="table-row" key={item.id}>
                  <div className="select-column">
                    <input
                      type="radio"
                      name="letter"
                      checked={selectedLetter === item.id}
                      onChange={() => setSelectedLetter(item.id)}
                    />
                  </div>

                  <div className="category-column">
                    {item.category}
                  </div>

                  <div className="letter-column">
                    {item.letter}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-footer">
            <button
              className="outline-button"
              onClick={handleAddFavorite}
              disabled={selectedLetter === null}
            >
              <span className="button-icon">+</span>
              Add to favorites
            </button>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <section className="letter-panel favorites-panel">
          <div className="panel-title">Browse favorites</div>

          <div className="favorites-table">
            <div className="table-header">
              <div className="select-column">Select</div>
              <div className="category-column">Category</div>
              <div className="letter-column">Letter</div>
            </div>

            <div className="favorites-scroll">
              {favoriteLetters.map((item) => (
                <div className="table-row" key={item.id}>
                  <div className="select-column">
                    <input
                      type="radio"
                      name="favorite"
                      checked={selectedFavorite === item.id}
                      onChange={() => setSelectedFavorite(item.id)}
                    />
                  </div>

                  <div className="category-column">
                    {item.category}
                  </div>

                  <div className="letter-column">
                    {item.letter}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="panel-footer">
            <button
              className="outline-button remove-button"
              onClick={handleRemoveFavorite}
              disabled={selectedFavorite === null}
            >
              <span className="delete-icon">▣</span>
              Remove from favorites
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
