import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div>
      <Link to="/videogames">
        <button>Press start to play</button>
      </Link>
    </div>
  );
};

export default LandingPage;
