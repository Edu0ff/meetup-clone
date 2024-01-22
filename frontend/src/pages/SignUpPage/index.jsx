import React, { useState, useContext } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { registerUserService, loginUserService } from "../../services/index.js";
import { toast } from "sonner";
import { AuthContext } from "../../context/AuthContext.jsx";

function SignUpPage() {
  const navigate = useNavigate();
  const { setToken, setLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [bio, setBio] = useState("");

  const handleBioChange = (event) => {
    const newBio = event.target.value.slice(0, 255);
    setBio(newBio);
  };

  const characterCount = bio.length;

  const handleForm = async (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      toast.error(
        `Las "contraseñas" que ingresaste no coinciden. Asegúrate de ingresar la misma contraseña en ambos campos.`
      );
      return;
    }

    try {
      await registerUserService({
        username,
        name,
        last_name: lastName,
        category,
        bio,
        email,
        password: pass1,
      });

      const loginToken = await loginUserService({ email, password: pass1 });

      setToken(loginToken);
      setLogin(true);

      navigate(`/`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error(
          "El nombre de usuario o la dirección de correo electrónico ya está en uso."
        );
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <main className="signup-page">
      <div className="signup-container">
        <img className="signup-image" src="/img/cosplay.avif" alt="" />
        <div className="signup-section">
          <div className="signup-header">
            <Link to="/signup">Sign Up</Link>
            <Link to="/signin">Sign In</Link>
          </div>
          <form onSubmit={handleForm}>
            <ul>
              <li className="form-group">
                <label htmlFor="username">Nombre de usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="lastName">Apellido</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="category">Categoría</label>
                <select
                  id="category"
                  name="category"
                  required
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Selecciona una categoría</option>
                  <option value="usuario">Usuario</option>
                  <option value="administrador">Administrador</option>
                </select>
              </li>
              <li className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="pass1">Contraseña</label>
                <input
                  type="password"
                  id="pass1"
                  name="pass1"
                  required
                  onChange={(e) => setPass1(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="pass2">Repetir contraseña</label>
                <input
                  type="password"
                  id="pass2"
                  name="pass2"
                  required
                  onChange={(e) => setPass2(e.target.value)}
                />
              </li>
              <li className="form-group">
                <label htmlFor="bio">
                  Cuenta al mundo algo pequeño sobre ti.
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  value={bio}
                  onChange={handleBioChange}
                  required
                  maxLength={255}
                />
                <div className="character-count">{`${characterCount}/255`}</div>
              </li>
            </ul>

            <div className="form-group">
              <p>¿Ya tienes una cuenta con nosotros?</p>
              <Link style={{ textAlign: "center" }} to="/signin">
                <p className="anchor">Inicia sesión</p>
              </Link>
            </div>
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
