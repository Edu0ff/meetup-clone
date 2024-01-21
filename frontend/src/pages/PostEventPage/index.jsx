import React, { useState } from "react";
import "./style.css";
import ArrowButton from "../../components/ArrowButton";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function PostEventPage() {
  const [description, setDescription] = useState("");

  const handleDescriptionChange = (event) => {
    const newDescription = event.target.value.slice(0, 400);
    setDescription(newDescription);
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
              placeholder="title"
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
                maxLength={400}
              />
              <div className="character-count">{`${characterCount}/400`}</div>
            </div>
            <div>
              <label htmlFor="image">select a file for your event photo</label>
              <input type="file" id="image" name="image" accept="image/*" />
            </div>
            <div>
              <select id="category" name="category" required>
                <option value="">category</option>
                <option value="category1">Category 1</option>
                <option value="category2">Category 2</option>
              </select>
            </div>
            <div>
              <label htmlFor="when">When?</label>
              <input type="text" id="when" name="when" required />
            </div>
            <Calendar />
            <div>
              <label htmlFor="where">Where?</label>
              <input type="text" id="where" name="where" required />
            </div>

            <ArrowButton id="post-button" type="submit" />
          </form>
        </div>
      </div>
    </main>
  );
}

export default PostEventPage;
