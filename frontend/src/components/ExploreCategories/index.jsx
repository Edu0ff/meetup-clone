import React from "react";
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

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    onCategoryChange(selectedCategory);
  };

  return (
    <div className="explore-categories">
      <h2>Explore Categories</h2>
      <select onChange={handleCategoryChange}>
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ExploreCategories;
