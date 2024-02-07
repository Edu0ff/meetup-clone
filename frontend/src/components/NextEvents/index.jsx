import React, { useState, useEffect } from "react";
import EventCard from "../EventCard";
import Loading from "../Loading";
import { searchMeetups } from "../../services/index.js";
import { Link } from "react-router-dom";
import NoNextEvents from "../NoNextEvents";
import "./style.css";

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

  const firstThreeMeetups = filteredAndSortedMeetups.slice(0, 4);

  return (
    <div className="next-events">
      {loading ? (
        <Loading />
      ) : firstThreeMeetups.length > 0 ? (
        <div className="event-cards-container">
          <div className="green-banner" id="nextevents-banner">
            <p>Next Events!</p>
          </div>
          <div className="horizontal-events">
            {firstThreeMeetups.map((meetup) => (
              <EventCard key={meetup.id} meetup={meetup} />
            ))}
          </div>
        </div>
      ) : (
        <NoNextEvents />
      )}
    </div>
  );
}

export default NextEvents;
