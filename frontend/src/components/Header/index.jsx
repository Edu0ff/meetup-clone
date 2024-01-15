import "./style.css";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <nav className="header-nav">
        {/* <HomeButton/> */}
        <NavLink to="/">MeeMee</NavLink>
        <NavLink to="/">Post Event</NavLink>
        <NavLink to="/">Explore Events</NavLink>
        <NavLink to="/">Sign In</NavLink>
      </nav>
    </header>
  );
}

export default Header;
