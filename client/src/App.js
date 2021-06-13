import React from "react";
import { Route } from "react-router";
import "./App.css";
// import gameDetails from "./components/gameDetails/gameDetails";
import home from "./components/home/home";
import genres from "./components/genres/genres";
// import navBar from "./components/navBar/navBar";
// import Search from "./components/search/search";
import postGame from "./components/postGame/postGame";

function App() {
  return (
    <div className="App">
      <navBar />
      <Route path="/videogames" component={home} />
      <Route path="/genres" component={genres} />
      <Route exact path="/videogame/" component={postGame} />
      <Route
        path="/videogame/:id"
        render={({ match }) => <gameDetails match={match} />}
      />
    </div>
  );
}

export default App;
