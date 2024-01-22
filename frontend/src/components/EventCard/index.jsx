import React from "react";
import "./style.css";

function EventCard() {
  return (
    <div className="event-card">
      <img
        className="eventcard-image"
        src="https://images.unsplash.com/photo-1703994643629-6d0d56ee7a0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTcwNTY4MjY3Mw&ixlib=rb-4.0.3&q=80&w=1080"
        alt=""
        width={300}
        height={200}
      />
      <p className="eventcard-location">
        <img className="event-icon" src="icons\location.svg" alt="mail" />
        Location
      </p>
      <h1 className="eventcard-title">Event Title</h1>
      <h2 className="eventcard-by">
        <img className="event-icon" src="icons\person.svg" alt="mail" />
        Organized by Jane Doe
      </h2>
      <div className="eventcard-details">
        <p className="eventcard-date">
          <img className="event-icon" src="icons\calendar.svg" alt="mail" />
          Date
        </p>
        <p className="eventcard-going">
          <img className="event-icon" src="icons\check.svg" alt="mail" />9 Going
        </p>
      </div>
    </div>
  );
}

export default EventCard;
