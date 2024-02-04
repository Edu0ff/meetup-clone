import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUserService, loginUserService } from "../../services/index.js";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext.jsx";
import ArrowButton from "../../components/ArrowButton";
import Loading from "../../components/Loading";
import "./style.css";

function SignUpPage() {
  const navigate = useNavigate();
  const { setToken, setLogin } = useContext(AuthContext);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBioChange = (event) => {
    const newBio = event.target.value.slice(0, 255);
    setBio(newBio);
  };

  const characterCount = bio.length;

  const handleForm = async (e) => {
    e.preventDefault();

    if (pass1 !== pass2) {
      toast.error(
        `Passwords do not match. Make sure to enter the same password in both fields.`
      );
      return;
    }

    if (pass1.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUserService({
        username,
        bio,
        email,
        password: pass1,
      });

      if (response.error) {
        toast.error(response.error);
        return;
      }

      const loginToken = await loginUserService({ email, password: pass1 });

      setToken(loginToken);
      setLogin(true);

      navigate(`/`);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Username or email is already in use.");
      } else {
        toast.error("Error during registration. Please try again later.");
      }
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 400);
    }
  };

  return (
    <main className="signin-page">
      {loading ? (
        <Loading />
      ) : (
        <div className="basic-container">
          <img className="signin-image" src="/img/cosplay.avif" alt="" />
          <div className="signin-section">
            <div className="signup-header">
              <Link to="/signup" className="link-sign" id="link-signup">
                Sign Up
              </Link>
              <Link to="/signin" className="link-sign">
                Sign In
              </Link>
            </div>
            <form onSubmit={handleForm}>
              <ul>
                <li className="form-group">
                  <input
                    className="input-reg"
                    type="text"
                    id="username"
                    name="username"
                    required
                    placeholder="nickname"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </li>
                <li className="form-group">
                  <input
                    className="input-reg"
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </li>
                <li className="form-group">
                  <input
                    className="input-reg"
                    htmlFor="pass1"
                    type="password"
                    id="pass1"
                    name="pass1"
                    required
                    placeholder="password"
                    onChange={(e) => setPass1(e.target.value)}
                  />
                </li>
                <li className="form-group">
                  <input
                    className="input-reg"
                    htmlFor="pass2"
                    type="password"
                    id="pass2"
                    name="pass2"
                    required
                    placeholder="repeat password"
                    onChange={(e) => setPass2(e.target.value)}
                  />
                </li>
                <li className="form-group">
                  <textarea
                    className="input-reg"
                    id="bio"
                    name="bio"
                    value={bio}
                    onChange={handleBioChange}
                    required
                    placeholder="tell the world a little about you_"
                    maxLength={255}
                  />
                  <div className="character-count">{`${characterCount}/255`}</div>
                </li>
              </ul>

              <ArrowButton id="signup-button" type="submit" />
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default SignUpPage;
