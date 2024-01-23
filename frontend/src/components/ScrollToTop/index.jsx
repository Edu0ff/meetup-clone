import React, { useState, useEffect } from "react";
import BlackArrow from "../BlackArrow";
import "./style.css";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsVisible(scrollTop > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      id="scrollto-top"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <BlackArrow />
    </button>
  );
};

export default ScrollToTop;
