import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="landBody">
      <header>
        <Link to="/videogames">
          <button id="startbtn">Press start to play</button>
        </Link>
      </header>
    </div>
  );
};

export default LandingPage;
