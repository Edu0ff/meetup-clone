import React from "react";
import "./style.css";
import Loading from "../Loading";

function ExploreCategories({ onCategoryChange, isLoading }) {
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
      <h2>Discover Categories</h2>
      {isLoading ? (
        <Loading />
      ) : (
        <select onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default ExploreCategories;
