import React, { useState } from "react";
import "./style.css";
import ArrowButton from "../../components/ArrowButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PostEventPage() {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value.slice(0, 255);
    setDescription(newDescription);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const characterCount = description.length;

  return (
    <main className="postevent-page">
      <div className="postevent-container">
        <div className="top-line">
          <h1 className="postevent-title">Event Details</h1>
        </div>
        <div className="formevent-container">
          <form action="">
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title_"
              required
            />
            <div className="description-group">
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={handleDescriptionChange}
                required
                placeholder="description_"
                maxLength={255}
              />
              <div className="character-count">{`${characterCount}/255`}</div>
            </div>
            <div>
              <label htmlFor="image">select a file for your event photo</label>
              <input type="file" id="image" name="image" accept="image/*" />
            </div>
            <div>
              <select id="category" name="category" required>
                <option value="">select a category</option>
                <option value="category1">Social Events</option>
                <option value="category2">Art and Culture</option>
                <option value="category3">Videogames</option>
                <option value="category4">Technology</option>
                <option value="category5">Travel and Outdoors</option>
                <option value="category6">Sports and Fitness</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                id="city"
                name="city"
                placeholder="select a city_"
                value={selectedCity}
                onChange={handleCityChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="select an address_"
              />
            </div>
            <div>
              <input
                type="text"
                id="day"
                name="day"
                placeholder="select a day_"
                value={selectedDate ? selectedDate.toLocaleDateString() : ""}
                required
                readOnly
              />
            </div>

            <Calendar onChange={handleDateChange} value={selectedDate} />

            <div>
              <input
                type="text"
                id="hour"
                name="hour"
                required
                placeholder="select an hour_"
                value={selectedTime}
                onChange={handleTimeChange}
              />
            </div>

            <ArrowButton id="post-button" type="submit" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default PostEventPage;
