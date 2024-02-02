import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { activateUserService, loginUserService } from "../../services/index.js";
import ArrowButton from "../../components/ArrowButton";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./style.css";
import Loading from "../../components/Loading/index.jsx";

function SignInPage() {
  const { setToken, setLogin, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { token } = useParams();
  const [activated, setActivated] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const activateAccount = async (token) => {
      try {
        const response = await activateUserService({ token });
        if (response.message === "Account activated successfully") {
          toast.success("Session initiated successfully!");
          setActivated(true);
        }

        if (response) {
          navigate("/account/myprofile");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 400);
      }
    };

    if (!initialLoad && token && !activated) {
      activateAccount(token);
    }
    setInitialLoad(false);
  }, [token, activated, initialLoad, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await loginUserService({ email, password });
      setToken(data);
      setLogin(true);
      setAuth(true);

      if (data) {
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
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
        <div className="basic-container" id="signin-container">
          <img className="signin-image" src="/img/show.avif" alt="" />
          <div className="signin-section">
            <div className="signin-header">
              <Link to="/signup">Sign Up</Link>
              <Link to="/signin">Sign In</Link>
            </div>
            <h2 className="signin-text">Glad to see you again!</h2>
            <form onSubmit={submitHandler}>
              <div className="form-group">
                <input
                  className="input-reg"
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <input
                  className="input-reg"
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="form-group">
                <ArrowButton id="signin-button" type="submit" />
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

export default SignInPage;
