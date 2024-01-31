import React, { useState } from "react";
import { createAttendeeService } from "../../services/index.js";

const AttendeeButton = ({
  meetupId,
  userId,
  username,
  token,
  updateAttendees,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCreateAttendee = async () => {
    try {
      setLoading(true);
      setError(null);

      await createAttendeeService({ meetupId, userId, username, token });

      console.log("Asistente creado exitosamente");
      updateAttendees();
    } catch (error) {
      console.error("Error al crear el asistente:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendee-button">
      <button
        id="button-signme"
        onClick={handleCreateAttendee}
        disabled={loading}
      >
        {loading ? "Creando asistente..." : "sign me up!"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AttendeeButton;
