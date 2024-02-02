import { useContext, useState } from "react";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import toast from "react-hot-toast";
import { updataUserEmailService } from "../../services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const EmailComponent = ({ currentEmail }) => {
  const navigate = useNavigate();
  const { token, logoutHandler, userData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const handleEdit = () => {
    setNewEmail(currentEmail);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!newEmail) {
        toast.error("Email field cannot be empty.");
        return;
      }

      const data = await updataUserEmailService({
        email: newEmail,
        token,
        id: userData.userId,
      });
      toast.success("Update successful.");

      const clave = data.token;

      logoutHandler();
      navigate(`/registered/${clave}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setNewEmail(currentEmail);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <>
          <input
            className="input-personal"
            type="email"
            name="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            placeholder="New Email"
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
                title="Accept"
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
                title="Cancel"
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
          {currentEmail}
          <FaPencilAlt
            className="fondo2"
            title="Edit Email"
            onClick={handleEdit}
            style={{
              cursor: "pointer",
            }}
          />
        </h3>
      )}
      <input type="hidden" name="email" value={currentEmail} readOnly />
    </>
  );
};

export default EmailComponent;
