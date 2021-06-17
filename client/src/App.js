import React from "react";
import { Route } from "react-router";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import GameDetails from "./Components/GameDetails/GameDetails";
import Navbar from "./Components/NavBar/NavBar";
// import Genres from "./Components/Genres/Genres";
import PostGame from "./Components/PostGame/PostGame";

function App() {
  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/videogames" component={Navbar} />
      <Route path="/videogames" component={Home} />
      {/* <Route path="/genres" component={Genres} /> */}
      <Route path="/newgame" component={Navbar} />
      <Route exact path="/newgame/" component={PostGame} />
      <Route path="/videogame/:id" component={GameDetails} />
    </div>
  );
}

export default App;
