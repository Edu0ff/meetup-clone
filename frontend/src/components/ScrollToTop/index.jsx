import React, { useState, useEffect } from "react";
import "./style.css";
import BlackArrow from "../BlackArrow";

function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <BlackArrow id="scrollto-top" />

    // <button
    //   className={`scroll-to-top ${isVisible ? "show" : "hide"}`}
    //   onClick={scrollToTop}
    // >
    //   ⬆
    // </button>
  );
}

export default ScrollToTop;
