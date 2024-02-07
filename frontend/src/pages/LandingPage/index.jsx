import React from "react";
import "./style.css";

import SearchBar from "../../components/SearchBar";
import NextEvents from "../../components/NextEvents";

function LandingPage() {
  return (
    <main className="LandingPage">
      <section className="landing-top">
        <div className="first-row">
          <h1 className="header-text">
            Join our vibrant community and discover unique moments that will
            connect you with amazing people!
          </h1>
          <div className="Hello">Hello!</div>
        </div>
        {/* <div className="second-row">
          <SearchBar placeholderText="Search events_" />
          <button className="landing-signup">Sign Up</button>
        </div> */}
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
