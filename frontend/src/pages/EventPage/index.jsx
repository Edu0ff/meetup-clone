import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function EventPage() {
  const { id } = useParams();
  const [eventData, setEventData] = useState(null);
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
        <>
          <div className="event-container">
            <h1 className="event-title">{eventData.title}</h1>
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
                <p>{eventData.location}</p>
              </div>
            </div>
            <div className="green-banner" id="event-time">
              <img
                className="event-icon"
                src="../../icons\calendar.svg"
                alt="calendar"
              />
              {eventData.date}
              {eventData.time}
            </div>
            <div className="green-banner" id="event-going">
              <img
                className="event-icon"
                src="../../icons\attendees.svg"
                alt="signme"
              />
              {eventData.attendees_count} going
            </div>
            <div className="green-banner" id="event-signme">
              <img
                className="event-icon"
                src="../../icons\check.svg"
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
              <p id="eventpage-text">
                {eventData.text} Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Error molestias incidunt dignissimos eveniet
                commodi omnis perspiciatis, officiis, repellendus modi
                consequatur enim libero tempora voluptates, nostrum unde maiores
                natus ipsa. Provident!
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
                  <p id="eventpage-organizedby">
                    Organized by {eventData.organizer}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No hay datos disponibles para este evento.</p>
      )}
    </main>
  );
}

export default EventPage;
