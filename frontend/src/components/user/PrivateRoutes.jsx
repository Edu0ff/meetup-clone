import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
function PrivateRoutes() {
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    if (!auth) {
      navigate("signin");
    }
  }, []);

  return (
    <>
      {auth ? (
        <>
          <section
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "100%",
            }}
          >
            <Outlet />
          </section>
        </>
      ) : null}
    </>
  );
}

export default PrivateRoutes;
