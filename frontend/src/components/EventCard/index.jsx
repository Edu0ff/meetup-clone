import React from "react";
import "./style.css";
import Loading from "../Loading";

function EventCard({ meetup }) {
  return (
    <div className="event-card">
      {meetup ? (
        <>
          <img
            className="eventcard-image"
            src={meetup.picture || ""}
            alt={`Event: ${meetup.title}`}
            width={300}
            height={200}
          />
          <p className="eventcard-location">
            <img
              className="event-icon"
              src="icons/location.svg"
              alt="Location"
            />
            {meetup.location}
          </p>
          <h1 className="eventcard-title">{meetup.title}</h1>
          <p>{meetup.theme}</p>
          <h2 className="eventcard-by">
            <img
              className="event-icon"
              src="icons/person.svg"
              alt="Organizer"
            />
            Organized by {meetup.organizer}
          </h2>
          <div className="eventcard-details">
            <p className="eventcard-date">
              <img className="event-icon" src="icons/calendar.svg" alt="Date" />
              {meetup.date}
            </p>
            <p className="eventcard-going">
              <img className="event-icon" src="icons/check.svg" alt="Going" />
              {meetup.attendees_count} going
            </p>
          </div>
        </>
      ) : (
        <p>No hay datos de eventos disponibles.</p>
      )}
    </div>
  );
}

export default EventCard;
