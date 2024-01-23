import React, { useEffect, useState } from "react";
import "./style.css";
import { searchMeetups } from "../../services/index.js";
import Loading from "../Loading";

function EventCard() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const meetupsData = await searchMeetups();
        setMeetups(meetupsData);
      } catch (error) {
        console.error("Error fetching meetups:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetups();
  }, []);

  return (
    <div className="event-card">
      {loading ? (
        <Loading />
      ) : meetups.length > 0 ? (
        <ul>
          {meetups.map((meetup) => (
            <li key={meetup.id}>
              <img
                className="eventcard-image"
                src={meetup.picture}
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
                  <img
                    className="event-icon"
                    src="icons/calendar.svg"
                    alt="Date"
                  />
                  {meetup.date}
                </p>
                <p className="eventcard-going">
                  <img
                    className="event-icon"
                    src="icons/check.svg"
                    alt="Going"
                  />
                  {meetup.attendees_count} going
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}

export default EventCard;
