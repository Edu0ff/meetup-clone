import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ArrowButton from "../../components/ArrowButton";

function SignInPage() {
  return (
    <main className="signin-page">
      <div className="signin-container">
        <img className="signin-image" src="/img/show.avif" alt="" />
        <div className="signin-section">
          <div className="signin-header">
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>
          <h2 className="signin-text">Glad to see you again!</h2>
          <form action="">
            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="password"
              />
            </div>
            <ArrowButton type="submit" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
