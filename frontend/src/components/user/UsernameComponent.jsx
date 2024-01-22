import { useState } from "react";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { toast } from "sonner";

const UsernameComponent = ({ currentUsername, handleUsernameChange }) => {
  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  const handleEdit = () => {
    setNewUsername(currentUsername);
    setEditing(true);
  };

  const handleSave = () => {
    if (!newUsername) {
      toast.error("El campo username no se puede quedar vacio.");
      return;
    }

    handleUsernameChange(newUsername);
    setEditing(false);
    toast.success("Necesitas actualizar para guardar los cambios");
  };

  const handleCancel = () => {
    setNewUsername(currentUsername);
    setEditing(false);
  };

  return (
    <>
      {" "}
      {editing ? (
        <>
          <input
            className="input-personal"
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="Nuevo Username..."
          />

          <div
            style={{
              marginTop: "1rem",
            }}
          >
            <button
              type="button"
              onClick={handleSave}
              style={{
                marginRight: "1rem",
                cursor: "pointer",
              }}
            >
              <FaCheck
                title="Aceptar"
                style={{
                  color: "green",
                }}
              />
            </button>
            <button
              type="button"
              onClick={handleCancel}
              style={{
                cursor: "pointer",
              }}
            >
              <FaTimes
                title="cancelar"
                style={{
                  color: "red",
                }}
              />
            </button>
          </div>
        </>
      ) : (
        <h3
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "10px",
            textAlign: "left",
          }}
        >
          {currentUsername}
          <FaPencilAlt
            className="fondo2"
            title="Modificar Username"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
        </h3>
      )}
      <input type="hidden" name="username" value={currentUsername} readOnly />
    </>
  );
};

export default UsernameComponent;
