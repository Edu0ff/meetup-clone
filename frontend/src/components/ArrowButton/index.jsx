import React from "react";
import "./style.css";

function ArrowButton() {
  return (
    <button className="arrow-button">
      <div className="triangles-container">
        <div className="black-triangle">
          <div className="green-triangle"></div>
        </div>
      </div>
    </button>
  );
}

export default ArrowButton;
