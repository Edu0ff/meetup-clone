import "./style.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        {/* <HomeButton/> */}
        <NavLink to="/">MeeMee</NavLink>
        <NavLink to="/postEvent">Post Event</NavLink>
        <NavLink to="/events">Explore Events</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
      </nav>
    </header>
  );
}

export default Header;
