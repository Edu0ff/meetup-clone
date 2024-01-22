import React from "react";
import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
import SignOutButton from "../SignOutButton";
import "./style.css";

function Header() {
  return (
    <header className="header">
      <div className="triangleright-header"></div>
      <div className="triangleleft-header"></div>
      <nav className="header-nav">
        <div className="left-section">
          <HomeButton />
        </div>

        <div className="right-section">
          <NavLink to="/postevent">Post Event</NavLink>
          <NavLink to="/events">Explore Events</NavLink>
          <div className="separator"></div>
          <div className="nav-signin">
            <SignOutButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
