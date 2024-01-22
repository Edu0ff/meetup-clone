const Avatar = ({ imagen, estilo }) => {
  const imagenUrl = imagen
    ? `${import.meta.env.VITE_APP_BACKEND}/uploads/${imagen}`
    : null;

  const estiloAvatar = {
    display: "inline-block",
    backgroundSize: "cover",
    borderRadius: "50%",
    position: "relative",
    objectFit: "cover",
    ...estilo, // Fusionar el estilo pasado desde el componente padre
  };

  return (
    <img
      className="avatar-movil"
      src={imagenUrl || "/photoperfil.png"}
      alt="Mi Perfil"
      style={estiloAvatar}
    />
  );
};

export default Avatar;
