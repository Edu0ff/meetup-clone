import React from "react";
import "./style.css";

function ArrowButton() {
  return (
    <div className="arrow-element">
      <button className="arrow-button">
        <div className="triangles-container">
          <div className="black-triangle">
            <div className="green-triangle"></div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default ArrowButton;
