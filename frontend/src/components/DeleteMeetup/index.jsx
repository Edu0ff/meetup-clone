import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { deleteMeetup } from "../../services/index";
import { useParams, useNavigate } from "react-router-dom";

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
      {loading && <p>Deleting meetup...</p>}
      {error && <p>Error: {error}</p>}
      {isOrganizer && (
        <button
          id="button-signme"
          onClick={handleDeleteMeetup}
          disabled={loading}
        >
          Delete Meetup
        </button>
      )}
    </div>
  );
};

export default DeleteMeetup;
