import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import "./style.css";

function SignOutButton() {
  const { auth, logoutHandler } = useContext(AuthContext);

  return (
    <div className="sign-out-button">
      {auth ? (
        <NavLink to="#" onClick={logoutHandler} className="sign-out-link">
          Sign Out
        </NavLink>
      ) : (
        <NavLink to="/signin" className="sign-out-link">
          Sign In
        </NavLink>
      )}
    </div>
  );
}

export default SignOutButton;
