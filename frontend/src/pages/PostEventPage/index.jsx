import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import ArrowButton from "../../components/ArrowButton";
import Calendar from "react-calendar";
import { AuthContext } from "../../context/AuthContext.jsx";
import "react-calendar/dist/Calendar.css";
import { createMeetup } from "../../services/index.js";

function PostEventPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    picture: undefined,
    theme: "",
    location: "",
    address: "",
    date: "",
    time: "",
    organizer_id: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    setFormErrors({
      ...formErrors,
      [event.target.name]: null,
    });
  };

  const handleCreateMeetup = async () => {
    try {
      console.log("Inside handleCreateMeetup");
      if (!token) {
        console.log("Token is missing");
        return;
      }

      const decodedToken = JSON.parse(atob(token.split(".")[1]));

      const organizerId = parseInt(decodedToken.userId, 10);

      const meetupData = new FormData();
      meetupData.append("title", formData.title);
      meetupData.append("description", formData.description);
      meetupData.append("picture", formData.picture);
      const theme = formData.theme.replace(/\s+/g, "_");
      meetupData.append("theme", theme);
      meetupData.append("location", formData.location);
      meetupData.append("address", formData.address);
      meetupData.append("date", formData.date);
      meetupData.append("time", formData.time);
      meetupData.append("organizer_id", organizerId);

      const newMeetup = await createMeetup(
        Object.fromEntries(meetupData.entries()),
        token
      );

      console.log("New meetup created:", newMeetup);

      resetForm();
    } catch (error) {
      console.error("Error creating meetup:", error);
      alert("Error creating meetup. Please try again later.");
    }
  };
  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      picture: "",
      theme: "",
      location: "",
      address: "",
      date: "",
      time: "",
    });
    setFormErrors({});
  };

  const handlepictureChange = (e) => {
    setFormData({
      ...formData,
      picture: e.target.files[0],
    });
  };

  const validateForm = () => {
    const errors = {};

    if (formData.title.trim() === "") {
      errors.title = "El título es requerido";
    }

    if (formData.description.trim() === "") {
      errors.description = "La descripción es requerida";
    }

    if (formData.picture && !formData.picture.type.includes("image/")) {
      errors.picture = "Por favor, selecciona un archivo de imagen válido";
    }

    if (formData.theme.trim() === "") {
      errors.theme = "La categoría es requerida";
    }

    if (formData.location.trim() === "") {
      errors.location = "La ubicación es requerida";
    }

    if (formData.address.trim() === "") {
      errors.details = "La dirección es requerida";
    }

    if (formData.date.trim() === "") {
      errors.date = "El día es requerido";
    }

    if (formData.time.trim() === "") {
      errors.time = "La hora es requerida";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Handle Submit called");

    if (validateForm()) {
      await handleCreateMeetup();
    }
  };

  return (
    <main className="postevent-page">
      <div className="postevent-container">
        <div className="top-line">
          <h1 className="postevent-title">Event Details</h1>
        </div>
        <div className="formevent-container">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="title_"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <div className="description-group">
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                placeholder="description_"
                maxLength={255}
              />
            </div>
            <div>
              <input
                type="file"
                name="picture"
                accept="image/jpeg, image/png"
                onChange={handlepictureChange}
                style={{ marginBottom: "10px" }}
              />
              {formErrors.picture && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {formErrors.picture}
                </p>
              )}
            </div>
            <div>
              <select
                id="theme"
                name="theme"
                value={formData.theme}
                onChange={handleInputChange}
                required
              >
                <option value="">select a theme</option>
                <option value="Social Events">Social Events</option>
                <option value="Art and Culture">Art and Culture</option>
                <option value="Videogames">Videogames</option>
                <option value="Technology">Technology</option>
                <option value="Travel and Outdoors">Travel and Outdoors</option>
                <option value="Sports and Fitness">Sports and Fitness</option>
              </select>
            </div>
            <div>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="select a location"
                value={formData.location}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="select an address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                type="text"
                id="date"
                name="date"
                placeholder="select a date"
                value={formData.date}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <input
                type="text"
                id="time"
                name="time"
                required
                placeholder="select an time"
                value={formData.time}
                onChange={handleInputChange}
              />
            </div>

            <ArrowButton
              id="post-button"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                console.log("Submit button clicked");
                handleSubmit(e);
              }}
            />
          </form>
        </div>
      </div>
    </main>
  );
}

export default PostEventPage;
