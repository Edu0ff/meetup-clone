import React, { useState, useEffect } from "react";

function EventFilter({ locations, onFilterChange }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    onFilterChange(newLocation);
  };

  return (
    <div className="event-filter">
      <select
        id="location"
        name="location"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="" disabled>
          Search by city_
        </option>
        <option value="">All cities</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}

export default EventFilter;
