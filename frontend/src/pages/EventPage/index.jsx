import React from "react";
import "./style.css";

function EventPage() {
  return (
    <main className="event-page">
      <div className="green-banner" id="goback-banner">
        <button id="goback-button">Go Back</button>
      </div>
      <div className="event-container">
        <h1 className="event-title">Event Title</h1>
        <div className="event-locationinfo">
          <div className="event-map" id="eventpage-map">
            EventMap
          </div>
          <div className="event-location">
            <img
              className="event-icon"
              src="../../icons/location.svg"
              alt="location"
            />
            <p>and info</p>
          </div>
        </div>
        <div className="green-banner" id="event-time">
          <img
            className="event-icon"
            src="../../icons\calendar.svg"
            alt="calendar"
          />
          Date and hour
        </div>
        <div className="green-banner" id="event-going">
          9 going
        </div>
        <div className="green-banner" id="event-signme">
          <img
            className="event-icon"
            src="../../icons\check.svg"
            alt="attendees"
          />
          <button id="button-signme">Sign me up!</button>
        </div>
        <div id="eventpage-imgcontainer">
          <img
            id="eventpage-image"
            src="../../img/event1.jpg"
            alt="event photo"
          />
        </div>
        <div id="eventpage-details">
          <p id="eventpage-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            dolorum nesciunt ut amet magnam dignissimos dicta eos a magni
            adipisci? Laudantium expedita ipsam aut esse hic voluptatibus qui
            praesentium maxime.
          </p>
          <div>
            <img
              id="eventpage-person"
              src="../../userPhoto/user1.jpg"
              alt="user photo"
            />
            <div>
              <img
                className="event-icon"
                src="../../icons\person.svg"
                alt="orgnized by"
              />
              <p id="eventpage-organizedby">Organized by</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventPage;
