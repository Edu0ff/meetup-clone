import React from "react";
import "./style.css";

import SearchBar from "../../components/SearchBar";
import NextEvents from "../../components/NextEvents";

function LandingPage() {
  return (
    <main className="LandingPage">
      <section className="landing-top">
        <h1>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet nobis
          dolor ratione aspernatur!
        </h1>
        <div className="Hello">Hello!</div>
        <SearchBar />
        <button className="landing-signup">Sign Up</button>
      </section>

      <section className="landing-bottom">
        <NextEvents />
      </section>
    </main>
  );
}

export default LandingPage;
