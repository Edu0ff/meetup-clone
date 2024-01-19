import React from "react";
import "./style.css";

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search events_"></input>
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
