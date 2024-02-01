import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import toast from "react-hot-toast";
import Loading from "../../components/Loading/index.jsx";
import "./style.css";

function SignOutButton() {
  const { auth, logoutHandler } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 400));
      await logoutHandler();
      toast.success("See you later 🐊!");
    } catch (error) {
      toast.error("Error signing out. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sign-out-button">
      {loading ? (
        <Loading duration={400} />
      ) : (
        <>
          {auth ? (
            <NavLink to="#" onClick={handleSignOut} className="sign-out-link">
              Sign Out
            </NavLink>
          ) : (
            <NavLink to="/signin" className="sign-out-link">
              Sign In
            </NavLink>
          )}
        </>
      )}
    </div>
  );
}

export default SignOutButton;
