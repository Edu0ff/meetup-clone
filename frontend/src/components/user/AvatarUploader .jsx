import { useRef, useState } from "react";
import { FaCameraRetro, FaCheck, FaTimes } from "react-icons/fa";
import Avatar from "./Avatar";
import { toast } from "sonner";

const AvatarUploader = ({ handleAction, profile_imagen }) => {
  const [image, setImage] = useState(null);
  const [guardar, setGuardar] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setGuardar(true);
  };

  const handleSave = () => {
    handleAction(image);
    setGuardar(false);
    toast.success("Necesitas actualizar para guardar los cambios");
  };

  const handleCancel = () => {
    setImage(null);
    handleAction(null);
    fileInputRef.current.value = "";
  };

  return (
    <>
      <label htmlFor="fileInput">
        <FaCameraRetro
          className="fondo2"
          title="Descargar Avatar"
          style={{
            position: "absolute",
            margin: "10px",
            bottom: "-10px",
            right: "0px",
            fontSize: "24px",
            cursor: "pointer",
          }}
        />
      </label>
      {image ? (
        <>
          <img
            className="carga-avatar"
            src={URL.createObjectURL(image)}
            alt="Mi Perfil"
            style={{
              display: "inline-block",
              backgroundSize: "cover",
              borderRadius: "50%",
              position: "relative",
              objectFit: "cover",
            }}
          />
          {guardar ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <button
                type="button"
                onClick={handleSave}
                style={{
                  width: "1.5rem",
                  margin: "0.5rem",
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
                  width: "1.5rem",
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
          ) : null}
        </>
      ) : (
        <Avatar className={"avatar-movil"} imagen={profile_imagen} />
      )}
      <input
        id="fileInput"
        type="file"
        name="profile_image"
        onChange={handleImageChange}
        accept=".jpg, .png"
        style={{ display: "none" }}
        ref={fileInputRef} // Asocia la referencia al input
      />
    </>
  );
};

export default AvatarUploader;
