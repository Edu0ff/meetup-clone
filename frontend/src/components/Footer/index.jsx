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
        <Link to="mailto:contact@meemee.com" target="_blank">
          Mail
        </Link>
        <Link to="https://www.tiktok.com/" target="_blank">
          TikTok
        </Link>
        <Link to="https://www.facebook.com/" target="_blank">
          Facebook
        </Link>
        <Link to="https://www.instagram.com/" target="_blank">
          Instagram
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
