import React from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

function HomeButton() {
  return (
    <div className="home-button">
      <NavLink to="/" className="home-link">
        MeeMee
      </NavLink>
    </div>
  );
}

export default HomeButton;
