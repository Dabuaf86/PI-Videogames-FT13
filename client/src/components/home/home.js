import React from "react";
import Games from "../games/Games";
import Filters from "../genreFilter/GenreFilter";
import "./home.css";

const Home2 = () => {
  return (
    <div className="home">
      <span className="filterBar">
        <Filters />
      </span>
      <Games />
    </div>
  );
};

export default Home2;
