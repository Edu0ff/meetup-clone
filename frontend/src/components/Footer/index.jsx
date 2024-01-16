import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-links">
        <nav>
          <p>© 2024 MeeMee</p>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookie">Cookie Policy</Link>
        </nav>
      </div>
      <div className="footer-socials">
        <Link to="mailto:contact@meemee.com" target="_blank">
          <img src="icons\mail.svg" alt="mail" />
        </Link>
        <Link to="https://www.tiktok.com/" target="_blank">
          <img src="icons\tik-tok.svg" alt="tik-tok" />
        </Link>
        <Link to="https://discord.com/" target="_blank">
          <img src="icons\discord.svg" alt="discord" />
        </Link>
        <Link to="https://www.instagram.com/" target="_blank">
          <img src="icons\instagram.svg" alt="instagram" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
