import React, { useState, useEffect } from "react";

function EventFilter({ locations, onFilterChange }) {
  const [selectedLocation, setSelectedLocation] = useState("");

  const handleLocationChange = (event) => {
    const newLocation = event.target.value;
    setSelectedLocation(newLocation);
    onFilterChange(newLocation); // Llama a la función de filtro con la nueva ubicación seleccionada
  };

  return (
    <div className="event-filter">
      <label htmlFor="location">Filter by Location:</label>
      <select
        id="location"
        name="location"
        value={selectedLocation}
        onChange={handleLocationChange}
      >
        <option value="">All Locations</option>
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
