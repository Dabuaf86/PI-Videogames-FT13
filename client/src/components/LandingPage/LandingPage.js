import { Link } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div id="landBody">
      <Link to="/videogames">
        <button id="startbtn">Press start to play</button>
      </Link>
    </div>
  );
};

export default LandingPage;
