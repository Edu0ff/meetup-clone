import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "sonner";
import { FaCheck, FaPencilAlt, FaTimes } from "react-icons/fa";
import { updataUserPasswordService } from "../../services";

const PasswordComponent = ({ currentPassword }) => {
  const navigate = useNavigate();
  const { token, logoutHandler, userData } = useContext(AuthContext);
  const [editing, setEditing] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  const handleEdit = () => {
    setNewPassword(currentPassword);
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      if (!newPassword) {
        toast.error("El campo password no se puede quedar vacio.");
        return;
      }

      await updataUserPasswordService({
        password: newPassword,
        token,
        id: userData.userId,
      });
      toast.success("Actualización exitosa.");

      logoutHandler();
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setNewPassword(currentPassword);
    setEditing(false);
  };

  return (
    <>
      {editing ? (
        <>
          <input
            className="input-personal"
            type="password"
            name="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Nuevo Password..."
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
                title="Cancelar"
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
          Password ********
          <FaPencilAlt
            className="fondo2"
            onClick={handleEdit}
            title="Modificar Password"
            style={{
              cursor: "pointer",
            }}
          />
        </h3>
      )}
    </>
  );
};

export default PasswordComponent;
