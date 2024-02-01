import React, { useState, useEffect } from "react";
import {
  createAttendeeService,
  deleteAttendeeService,
} from "../../services/index.js";

const AttendeeButton = ({ meetupId, userId, token, updateAttendees }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAttendee, setIsAttendee] = useState(false);

  useEffect(() => {
    const checkAttendeeStatus = async () => {
      try {
        const attendeesResponse = await fetch(
          `${import.meta.env.VITE_APP_BACKEND}/attendees/${meetupId}/list`
        );
        const attendeesData = await attendeesResponse.json();
        if (attendeesData && attendeesData.message) {
          throw new Error(attendeesData.message);
        }

        if (!Array.isArray(attendeesData)) {
          throw new Error("Invalid data format: Expected an array");
        }

        const userIsAttendee = attendeesData.some(
          (attendee) => attendee.user_id === userId
        );

        setIsAttendee(userIsAttendee);
      } catch (error) {
        console.error("Error checking attendee status:", error);
      }
    };

    checkAttendeeStatus();
  }, [meetupId, userId]);

  const handleAttendeeAction = async () => {
    try {
      setLoading(true);
      setError(null);

      if (isAttendee) {
        await deleteAttendeeService({ meetupId, userId, token });
      } else {
        await createAttendeeService({ meetupId, userId, token });
      }

      console.log("Acción de asistente realizada exitosamente");
      setIsAttendee(!isAttendee);
      updateAttendees();
    } catch (error) {
      console.error("Error en la acción de asistente:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendee-button">
      <button
        id="button-signme"
        onClick={handleAttendeeAction}
        disabled={loading}
      >
        {loading
          ? "Realizando acción..."
          : isAttendee
          ? "Cancelar asistencia"
          : "Asistir"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default AttendeeButton;
