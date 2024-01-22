import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Auth = () => {
  const { auth, logoutHandler } = useContext(AuthContext);
  return (
    <ul>
      <li>
        <NavLink
          to="/register"
          style={{
            color: "white",
            marginLeft: "auto",
            marginRight: "10px",
            textDecoration: "none",
          }}
        >
          Register
        </NavLink>
      </li>
      <li>
        {auth ? (
          <NavLink
            to="/login"
            onClick={logoutHandler}
            style={{
              color: "white",
              marginLeft: "auto",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Logout
          </NavLink>
        ) : (
          <NavLink
            to="/login"
            style={{
              color: "white",
              marginLeft: "auto",
              marginRight: "10px",
              textDecoration: "none",
            }}
          >
            Login
          </NavLink>
        )}
      </li>
      <li>
        <NavLink to="/accounts/myprofile">My Profile</NavLink>
      </li>
    </ul>
  );
};

export default Auth;
