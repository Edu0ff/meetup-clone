import React, { useState, useEffect, useContext } from "react";
import { getAttendeesByMeetup } from "../../services/index";
import { AuthContext } from "../../context/AuthContext";
import { useParams } from "react-router-dom";

const AttendeesList = ({ updateAttendees }) => {
  const { id } = useParams();
  const { token } = useContext(AuthContext);
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendeesData = async () => {
      try {
        const attendeesData = await getAttendeesByMeetup(id, token);

        if (Array.isArray(attendeesData)) {
          setAttendees(attendeesData);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendeesData();
  }, [id, token, updateAttendees]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Lista de Asistentes del Meetup</h2>
      {attendees.length === 0 ? (
        <p>No hay asistentes en este meetup.</p>
      ) : (
        <ul>
          {attendees.map((attendee) => (
            <li key={attendee.id}>{attendee.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AttendeesList;
