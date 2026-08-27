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

function LetterSelection() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLetter, setSelectedLetter] = useState<number | null>(null);
  const [selectedFavorite, setSelectedFavorite] = useState<number | null>(
    null
  );

  const filteredLetters = selectedCategory
    ? letters.filter(
        (item) => item.category === selectedCategory
      )
    : letters;

  const handleAddFavorite = () => {
    if (selectedLetter === null) return;

    const selected = letters.find(
      (item) => item.id === selectedLetter
    );

    console.log("Add to favorites:", selected);
  };

  const handleRemoveFavorite = () => {
    if (selectedFavorite === null) return;

    const selected = favoriteLetters.find(
      (item) => item.id === selectedFavorite
    );

    console.log("Remove from favorites:", selected);
  };

  return (
    <div className="letter-selection-page">

      {/* =========================
          PAGE HEADER
      ========================== */}
      <div className="letter-selection-header">
        <div className="letter-selection-title">
          Letter selection
        </div>
      </div>

      {/* =========================
          CONTENT
      ========================== */}
      <div className="letter-selection-content">

        {/* =========================
            LEFT CARD
        ========================== */}
        <section className="letter-card">

          <div className="card-header">
            Select by category
          </div>

          <div className="card-content">

            {/* Category Dropdown */}
            <div className="category-field">

              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={selectedCategory}
                onChange={(e) =>
                  setSelectedCategory(e.target.value)
                }
              >
                <option value="">
                  Select a category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

            </div>

            {/* Letter Table */}
            <div className="letter-table">

              <div className="table-header">

                <div className="select-col">
                  Select
                </div>

                <div className="category-col">
                  Category
                </div>

                <div className="letter-col">
                  Letter
                </div>

              </div>

              <div className="table-body">

                {filteredLetters.map((item) => (

                  <div
                    className="table-row"
                    key={item.id}
                  >

                    <div className="select-col">

                      <input
                        type="radio"
                        name="letter"
                        checked={
                          selectedLetter === item.id
                        }
                        onChange={() =>
                          setSelectedLetter(item.id)
                        }
                      />

                    </div>

                    <div className="category-col">
                      {item.category}
                    </div>

                    <div className="letter-col">
                      {item.letter}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="card-footer">

            <button
              type="button"
              className="outline-button"
              disabled={selectedLetter === null}
              onClick={handleAddFavorite}
            >
              <span className="plus-icon">
                +
              </span>

              Add to favorites
            </button>

          </div>

        </section>

        {/* =========================
            RIGHT CARD
        ========================== */}
        <section className="letter-card">

          <div className="card-header">
            Browse favorites
          </div>

          <div className="card-content">

            {/* Favorites Table */}
            <div className="favorites-table">

              <div className="table-header">

                <div className="select-col">
                  Select
                </div>

                <div className="category-col">
                  Category
                </div>

                <div className="letter-col">
                  Letter
                </div>

              </div>

              <div className="favorites-scroll">

                {favoriteLetters.map((item) => (

                  <div
                    className="table-row"
                    key={item.id}
                  >

                    <div className="select-col">

                      <input
                        type="radio"
                        name="favorite"
                        checked={
                          selectedFavorite === item.id
                        }
                        onChange={() =>
                          setSelectedFavorite(item.id)
                        }
                      />

                    </div>

                    <div className="category-col">
                      {item.category}
                    </div>

                    <div className="letter-col">
                      {item.letter}
                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="card-footer">

            <button
              type="button"
              className="outline-button remove-button"
              disabled={selectedFavorite === null}
              onClick={handleRemoveFavorite}
            >
              <span className="delete-icon">
                ▣
              </span>

              Remove from favorites
            </button>

          </div>

        </section>

      </div>

    </div>
  );
}

export default LetterSelection;
