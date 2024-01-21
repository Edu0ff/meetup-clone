import React from "react";
import "./style.css";

function EventPage() {
  return (
    <main className="event-page">
      <div className="green-banner" id="goback-banner">
        <p>Go Back</p>
      </div>
      <div className="event-container">
        <h1 className="event-title">Event Title</h1>
        <div className="event-locationinfo">
          <div className="event-map">EventMap</div>
          <div className="event-location">and info</div>
        </div>
        <div className="event-time">Date and hour</div>
        <div className="event-going">9 going</div>
        <div className="event-signme">
          <button className="button-signme">Sign me up!</button>
        </div>
        <div>
          <img src="" alt="" />
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            dolorum nesciunt ut amet magnam dignissimos dicta eos a magni
            adipisci? Laudantium expedita ipsam aut esse hic voluptatibus qui
            praesentium maxime.
          </p>
          <div>
            <img src="" alt="" />
            <div>
              <p>Orgnized by</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EventPage;
