import React, { useEffect } from "react";
import { Route } from "react-router";
import "./App.css";
import LandingPage from "./Components/LandingPage/LandingPage";
import Home from "./Components/Home/Home";
import GameDetails from "./Components/GameDetails/GameDetails";
import Navbar from "./Components/NavBar/NavBar";
import PostGame from "./Components/PostGame/PostGame";
import { getAllVideogames } from "./Actions/Actions";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllVideogames());
  }, []);

  return (
    <div className="App">
      <Route exact path="/" component={LandingPage} />
      <Route path="/videogames" component={Navbar} />
      <Route path="/videogames" component={Home} />
      <Route path="/newgame" component={Navbar} />
      <Route path="/newgame/" component={PostGame} />
      <Route path="/videogame/:id" component={Navbar} />
      <Route path="/videogame/:id" component={GameDetails} />
    </div>
  );
}

export default App;
