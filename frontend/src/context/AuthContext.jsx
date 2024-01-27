import React, {
  createContext,
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import PropTypes from "prop-types";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProviderComponent = ({ children }) => {
  const storedToken = localStorage.getItem("token");
  const storedAuth = localStorage.getItem("auth");
  const storedUserData = localStorage.getItem("userData");

  const [token, setToken] = useState(storedToken || " ");
  const [userData, setUserData] = useState(
    storedUserData ? JSON.parse(storedUserData) : null
  );
  const [auth, setAuth] = useState(storedAuth === "true");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    localStorage.setItem("token", token);
    localStorage.setItem("auth", auth);

    if (token !== " ") {
      try {
        const decodedToken = jwtDecode(token);
        localStorage.setItem("userData", JSON.stringify(decodedToken));
        setUserData(decodedToken);
        setAuth(true);
        console.log(decodedToken);
        if (login) {
          toast.success(`Welcome ${decodedToken.email}`);
          setLogin(false);
        }
      } catch (error) {
        toast.error("Error decoding token:", error.message);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
  }, [token, auth, login]);

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.removeItem("userData");

    setUserData(null);
    setAuth(false);
    setToken(" ");
  }, []);

  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      userData,
      auth,
      setAuth,
      setLogin,
      logoutHandler,
    }),
    [token, userData, auth, setLogin, logoutHandler]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProviderComponent.propTypes = {
  children: PropTypes.node.isRequired,
};
