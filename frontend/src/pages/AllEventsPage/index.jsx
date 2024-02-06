import React, { useEffect, useState } from "react";
import { searchMeetups } from "../../services/index.js";
import Loading from "../../components/Loading";
import { Link } from "react-router-dom";
import EventCard from "../../components/EventCard";
import ExploreCategories from "../../components/ExploreCategories/index.jsx";
import EventFilter from "../../components/EventFilter";
import ScrollToTop from "../../components/ScrollToTop";
import ScrollBar from "../../components/ScrollBar";
import "./style.css";

function AllEventsPage() {
  const [meetups, setMeetups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState("");

  useEffect(() => {
    const fetchMeetups = async () => {
      try {
        const meetupsData = await searchMeetups();
        setMeetups(meetupsData);
      } catch (error) {
        console.error("Error fetching meetups:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }
    };

    fetchMeetups();
  }, []);

  const now = new Date();
  const filteredAndSortedMeetups = meetups
    .filter((meetup) => new Date(meetup.date) > now)
    .filter((meetup) => !selectedCategory || meetup.theme === selectedCategory)
    .filter(
      (meetup) =>
        !selectedLocation ||
        meetup.location.toLowerCase() === selectedLocation.toLowerCase()
    )
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <main className="events-page">
      <ScrollBar />
      <ScrollToTop />
      {loading ? (
        <Loading />
      ) : (
        <>
          <EventFilter
            locations={getUniqueLocations(meetups)}
            onFilterChange={handleLocationChange}
          />
          <ExploreCategories onCategoryChange={handleCategoryChange} />
          {filteredAndSortedMeetups.length > 0 ? (
            <ul>
              {filteredAndSortedMeetups.map((meetup) => (
                <li key={meetup.id}>
                  <EventCard meetup={meetup} />
                </li>
              ))}
            </ul>
          ) : (
            <p>No events available.</p>
          )}
        </>
      )}
    </main>
  );
}

const getUniqueLocations = (meetups) => {
  const locationsSet = new Set(
    meetups.map((meetup) => meetup.location.toLowerCase())
  );
  return Array.from(locationsSet);
};

export default AllEventsPage;
