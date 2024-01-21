import React from "react";
import "./style.css";

function ProfilePage() {
  return (
    <main className="profile-page">
      <div className="profile-container">
        <div className="top-line">
          <h1 className="profile-title" id="myaccount">
            My Account
          </h1>
          <h1 className="profile-title" id="myevents">
            My Events
          </h1>
          <h1 className="profile-title" id="events-saved">
            Events Saved
          </h1>
        </div>
        <div>
          <h2>User's name</h2>
          <img id="userphoto-profile" src="../../userPhoto/user2.jpg" alt="" />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, quam
            vel? Et officia, quia corporis excepturi ipsum facilis provident
            repudiandae, accusantium tempore fuga, dolor culpa. Et debitis ullam
            voluptas modi!
          </p>
        </div>
        <div>
          <button>Edit Profile</button>
          <button>Sign Out</button>
        </div>
      </div>
    </main>
  );
}

export default ProfilePage;
