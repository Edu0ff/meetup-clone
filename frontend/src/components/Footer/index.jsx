import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <nav>
          <p>2024 MeeMee</p>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Cookie Settings</Link>
          <Link to="/">Cookie Policy</Link>
        </nav>
      </div>
      <div className="footer-socials">
        <Link to="/" target="_blank">
          Mail
        </Link>
        <Link to="/" target="_blank">
          Facebook
        </Link>
        <Link to="/" target="_blank">
          Instagram
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
