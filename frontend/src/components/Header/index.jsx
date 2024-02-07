import React from "react";
import { NavLink } from "react-router-dom";
import HomeButton from "../HomeButton";
import SignOutButton from "../SignOutButton";
import { useState } from 'react'
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
        <input type="checkbox" className="mobile-menu-check" id="expand-menu"></input>
        <div className="right-section">
          <NavLink to="/postevent">Post Event</NavLink>
          <NavLink to="/events">Explore Events</NavLink>
          <div className="separator"></div>
          <div className="nav-signin">
            <SignOutButton />
          </div>
        </div>
        <div className="mobile-menu">
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
        </div>
      </nav>

    </header>
  );
}

export default Header;
