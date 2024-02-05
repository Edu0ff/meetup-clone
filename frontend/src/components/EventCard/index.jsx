import React from "react";
import "./style.css";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { format } from "date-fns";

function EventCard({ meetup }) {
  const formattedDate = meetup.date
    ? format(new Date(meetup.date), "dd/MM/yy")
    : "Date not available";

  const formattedTime = meetup.time ? meetup.time : "Time not available";

  return (
    <Link to={`/event/${meetup.id}`}>
      <div className="event-card">
        {meetup ? (
          <>
            <img
              className="eventcard-image"
              src={
                meetup.picture.endsWith(".jpg") ||
                meetup.picture.endsWith(".jpeg") ||
                meetup.picture.endsWith(".png") ||
                meetup.picture.endsWith(".gif")
                  ? `http://localhost:3000/uploads/${meetup.picture || ""}`
                  : meetup.picture
              }
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
              <p className="eventcard-organizer">
                <img
                  className="event-icon" src="icons/person.svg" alt="Organizer icon" />
                Organized by {meetup.organizer}
              </p>
            </div>
          </>
        ) : (
          <p>No event data available.</p>
        )}
      </div>
    </Link>
  );
}

export default EventCard;
