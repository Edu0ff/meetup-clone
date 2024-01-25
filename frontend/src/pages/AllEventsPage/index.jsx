import React, { useEffect, useState } from "react";
import "./style.css";
import { searchMeetups } from "../../services/index.js";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import SearchBar from "../../components/SearchBar/index.jsx";
import ExploreCategories from "../../components/ExploreCategories/index.jsx";

function AllEventsPage() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
    .filter((meetup) => !selectedCategory || meetup.theme === selectedCategory)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <main className="events-page">
      {loading ? (
        <Loading />
      ) : (
        <>
          <SearchBar placeholderText="Search by city_" />
          <ExploreCategories onCategoryChange={handleCategoryChange} />
          {filteredAndSortedMeetups.length > 0 ? (
            <ul>
              {filteredAndSortedMeetups.map((meetup) => (
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
        </>
      )}
    </main>
  );
}

export default AllEventsPage;
