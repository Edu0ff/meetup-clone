import React from "react";
import "./style.css";

import EventCard from "../EventCard";

function NextEvents() {
  return (
    <div className="next-events">
      <div className="green-banner" id="nextevents-banner">
        <p>Next Events!</p>
      </div>
      <EventCard />
    </div>
  );
}

export default NextEvents;
