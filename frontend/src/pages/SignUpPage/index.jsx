import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import ArrowButton from "../../components/ArrowButton";

function SignUnPage() {
  const [bio, setBio] = useState("");

  const handleBioChange = (event) => {
    const newBio = event.target.value.slice(0, 400);
    setBio(newBio);
  };

  const characterCount = bio.length;

  return (
    <main className="signup-page">
      <div className="basic-container">
        <img className="signup-image" src="/img/cosplay.avif" alt="" />
        <div className="signup-section">
          <div className="signup-header">
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>
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
            <div className="form-group">
              <input
                type="password"
                id="repeat-password"
                name="repeat-password"
                required
                placeholder="repeat password"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder="nickname"
              />
            </div>
            <div className="form-group">
              <textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={handleBioChange}
                required
                placeholder="tell the world a little about you_"
                maxLength={400}
              />
              <div className="character-count">{`${characterCount}/400`}</div>
            </div>
            <div className="form-group">
              <div className="profilepic-form">
                <img src="frontend\public\icons\person.svg" alt="" />
              </div>
              <label htmlFor="profile-picture">
                select a file for your profile photo_
              </label>
              <input
                type="file"
                id="profile-picture"
                name="profile-picture"
                accept="image/*"
              />
            </div>
            <ArrowButton id="signup-button" type="submit" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUnPage;
