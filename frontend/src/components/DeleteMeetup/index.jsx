import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteMeetup } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";
import "./style.css";

const DeleteMeetup = ({ meetupId, isOrganizer, onDeleteMeetup }) => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteMeetup = async () => {
    try {
      setLoading(true);
      await deleteMeetup(meetupId, token);
      onDeleteMeetup();
    } catch (error) {
      setError("Error deleting meetup: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {isOrganizer && (
        <button
          id="button-deletemeetup"
          onClick={handleDeleteMeetup}
          disabled={loading}
        >
          <img
            className="event-icon"
            src="../../icons/cross.svg"
            alt="delete event"
          />
          Delete event
        </button>
      )}
    </div>
  );
};

export default DeleteMeetup;
