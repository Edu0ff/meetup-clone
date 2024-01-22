import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ErrorMessage = ({ message }) => {
  return (
    <section className="error">
      <h1>Error</h1>
      <p>{message}</p>
      <Link to={"/"}>Go to home</Link>
    </section>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;
