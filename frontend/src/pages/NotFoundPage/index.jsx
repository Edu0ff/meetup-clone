import { Link } from "react-router-dom";
import "./style.css";
import ArrowButton from "../../components/ArrowButton";

const NotFoundPage = () => {
  return (
    <main className="not-found-main">
      <div className="not-found">
        <h1 className="errorfour">404</h1>
        <h2 className="pagenotfound">PAGE NOT FOUND</h2>
        <h3 className="go-back">GO BACK TO MeeMee</h3>
        <Link to="/">
          <ArrowButton />
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
