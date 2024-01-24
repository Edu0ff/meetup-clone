import React, { useState, useEffect } from "react";
import "./style.css";
import EventCard from "../EventCard";
import Loading from "../Loading";
import { searchMeetups } from "../../services/index.js";
import { Link } from "react-router-dom";

function NextEvents() {
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

  const now = new Date();
  const filteredAndSortedMeetups = meetups
    .filter((meetup) => new Date(meetup.date) > now)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="next-events">
      <div className="green-banner" id="nextevents-banner">
        <p>Next Events!</p>
      </div>
      {loading ? (
        <Loading />
      ) : filteredAndSortedMeetups.length > 0 ? (
        <div className="event-cards-container">
          {filteredAndSortedMeetups.map((meetup) => (
            <Link key={meetup.id} to={`/event/${meetup.id}`}>
              <EventCard meetup={meetup} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </div>
  );
}

export default NextEvents;
