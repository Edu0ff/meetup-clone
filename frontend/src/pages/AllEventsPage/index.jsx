import React, { useEffect, useState } from "react";
import "./style.css";
import { searchMeetups } from "../../services/index.js";

function AllEventsPage() {
  const [meetups, setMeetups] = useState([]);

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const meetupsData = await searchMeetups();
        setMeetups(meetupsData);
      } catch (error) {
        console.error("Error fetching meetups:", error);
      }
    };

    fetchMeetups();
  }, []);

  return (
    <main className="events-page">
      {/*   <h1>All Events Page</h1>
      {meetups.length > 0 ? (
        <ul>
          {meetups.map((meetup) => (
            <li key={meetup.id}>
              <p>Title: {meetup.title}</p>
              <p>Picture: {meetup.picture}</p>
              <p>Theme: {meetup.theme}</p>
              <p>Location: {meetup.location}</p>
              <p>Date: {meetup.date}</p>
              <p>Time: {meetup.time}</p>
              <p>Attendees Count: {meetup.attendees_count}</p>
              <p>Created At: {meetup.created_at}</p>
              <p>Updated At: {meetup.updated_at}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay eventos disponibles.</p>
      )} */}
    </main>
  );
}

export default AllEventsPage;
