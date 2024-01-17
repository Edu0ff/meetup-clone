import "./style.css";
import { NavLink } from "react-router-dom";

import HomeButton from "../HomeButton";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        <div className="left-section">
          <HomeButton />
        </div>

        <div className="right-section">
          <NavLink to="/postEvent">Post Event</NavLink>
          <NavLink to="/events">Explore Events</NavLink>
          <div className="separator"></div>
          <div className="nav-signin">
            <NavLink to="/signin">Sign In</NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
