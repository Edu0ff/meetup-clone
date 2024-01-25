import React from "react";
import "./style.css";

function SearchBar({ placeholderText = "" }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={`${placeholderText && `${placeholderText}`}`}
      />
      <div className="search-element">
        <button className="search-button">
          <div className="searchtriangles-container">
            <div className="searchblack-triangle">
              <div className="searchgreen-triangle"></div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
