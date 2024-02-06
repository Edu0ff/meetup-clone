import React, { useState } from "react";
import BlackArrow from "../BlackArrow";
import "./style.css";

function ExploreCategories({ onCategoryChange }) {
  const categories = [
    "Social Events",
    "Art and Culture",
    "Videogames",
    "Technology",
    "Travel and Outdoors",
    "Sports and Fitness",
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setIsMenuOpen(false);
  };

  const handleCategoryChange = (category) => {
    onCategoryChange(category);
    setIsMenuOpen(false);
  };

  return (
    <div
      className="explore-categories"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <BlackArrow id="explore-arrow" />
      <h2>Explore Categories</h2>

      {isMenuOpen && (
        <div className="category-menu">
          <ul>
            {categories.map((category) => (
              <li key={category} onClick={() => handleCategoryChange(category)}>
                {category}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExploreCategories;
