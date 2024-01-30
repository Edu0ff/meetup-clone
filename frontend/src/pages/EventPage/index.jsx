import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import AttendeesList from "../../components/ListAttendees/index.jsx";

function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
  const [organizerUsername, setOrganizerUsername] = useState("");
  const [organizerAvatar, setOrganizerAvatar] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BACKEND}/meetups/${id}`
        );

        const eventData = await response.json();

        if (!response.ok) {
          throw new Error(eventData.message);
        }

        setEventData(eventData);
        if (eventData.organizer_id) {
          const organizerResponse = await fetch(
            `${import.meta.env.VITE_APP_BACKEND}/organizers/${
              eventData.organizer_id
            }`
          );
          const organizerData = await organizerResponse.json();

          if (!organizerResponse.ok) {
            throw new Error(organizerData.message);
          }

          setOrganizerUsername(organizerData.username);
          setOrganizerAvatar(organizerData.avatar);
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  return (
    <main className="event-page">
      <div className="green-banner" id="goback-banner">
        <Link to="/events">
          <button id="goback-button">Go back</button>
        </Link>
      </div>
      {loading ? (
        <Loading />
      ) : eventData ? (
        <div className="event-container">
          <h1 className="event-title">{eventData.title}</h1>
          <div className="event-locationinfo">
            <div className="event-map" id="eventpage-map">
              {eventData.address}
            </div>
            <div className="event-location">
              <img
                className="event-icon"
                src="../../icons/location.svg"
                alt="location"
              />
              <p>{eventData.location}</p>
            </div>
          </div>
          <div className="green-banner" id="event-time">
            <img
              className="event-icon"
              src="../../icons/calendar.svg"
              alt="calendar"
            />
            {eventData.date}
            {eventData.time}
          </div>
          <Link to="/">
            <div className="green-banner" id="event-going">
              <img
                className="event-icon"
                src="../../icons/attendees.svg"
                alt="signme"
              />
              {eventData.attendees_count} going
            </div>
          </Link>
          <div className="green-banner" id="event-signme">
            <img
              className="event-icon"
              src="../../icons/check.svg"
              alt="signme"
            />
            <button id="button-signme">Sign me up!</button>
          </div>
          <div id="eventpage-imgcontainer">
            <img
              id="eventpage-image"
              className="event-icon"
              src={eventData.picture || ""}
              alt={`Event: ${eventData.title}`}
            />
          </div>
          <div id="eventpage-details">
            <p id="eventpage-text">{eventData.description}</p>
            <div>
              {organizerAvatar ? (
                <img
                  id="eventpage-person"
                  src={`${import.meta.env.VITE_APP_BACKEND}/${organizerAvatar}`}
                  alt={`Avatar of ${organizerUsername || ""}`}
                />
              ) : (
                ""
              )}
              <div>
                <img
                  className="event-icon"
                  src="../../icons/person.svg"
                  alt="orgnized by"
                />
                <AttendeesList />
                <p id="eventpage-organizedby">{`Organized by ${
                  organizerUsername || ""
                }`}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>No hay datos disponibles para este evento.</p>
      )}
    </main>
  );
}

export default EventPage;
