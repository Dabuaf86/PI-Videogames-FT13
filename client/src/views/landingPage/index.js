import { Link } from "react-router-dom";
import "./landingPage.css";

const LandingPage = () => {
  return (
    <div className="container">
      <Link to="/videogames">
        <button id="startbtn">JUST PUSH PLAY</button>
      </Link>
    </div>
  );
};

export default LandingPage;