import React from "react";
import "./style.css";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ meetup }) {
  const formattedDate = meetup.date
    ? format(new Date(meetup.date), "dd/MM/yy")
    : "No date available";

  const formattedTime = meetup.time ? meetup.time : "No time available";

  return (
    <Link to={`/event/${meetup.id}`}>
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
            <p className="eventcard-by">{meetup.theme}</p>
            <div className="eventcard-details">
              <p className="eventcard-date">
                <img
                  className="event-icon"
                  src="icons/calendar.svg"
                  alt="Date"
                />
                {formattedDate}
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
    </Link>
  );
}

export default EventCard;
