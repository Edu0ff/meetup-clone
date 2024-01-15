import { Link } from "react-router-dom";
import "./style.css";

const NotFoundPage = () => {
  return (
    <main className="not-found-main">
      <div className="not-found">
        <h2>404 - Página no encontrada</h2>
        <Link to="/">
          <button>Volver al Inicio</button>
        </Link>
      </div>
    </main>
  );
};

export default NotFoundPage;
