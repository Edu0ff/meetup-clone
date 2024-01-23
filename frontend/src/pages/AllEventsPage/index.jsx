import React, { useEffect, useState } from "react";
import "./style.css";
import { searchMeetups } from "../../services/index.js";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";

function AllEventsPage() {
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
    <main className="events-page">
      <h1>All Events Page</h1>
      {loading ? (
        <Loading />
      ) : meetups.length > 0 ? (
        <ul>
          {meetups.map((meetup) => (
            <li key={meetup.id}>
              <Link to={`/event/${meetup.id}`}>
                <EventCard meetup={meetup} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos disponibles.</p>
      )}
    </main>
  );
}

export default AllEventsPage;
