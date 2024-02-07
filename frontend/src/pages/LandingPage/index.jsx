import React from "react";
import "./style.css";

import SearchBar from "../../components/SearchBar";
import NextEvents from "../../components/NextEvents";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function LandingPage() {
  return (
    <main className="LandingPage">
      <section className="landing-top">
        <div className="first-row">
          <h1 className="header-text">
            Find your next event and meet people who share your interests! 🎉
            Make friends, learn new things, and have fun!
          </h1>
          <div className="Hello">Hello!</div>
        </div>
        <div className="second-row">
          <SearchBar placeholderText="Search events_" />
          <button className="landing-signup">Sign Up</button>
        </div>
      </section>

      <section className="landing-bottom">
        <div className="triangle-left"></div>
        <div className="triangle-right"></div>
        <NextEvents />
      </section>
    </main>
  );
}

export default LandingPage;
