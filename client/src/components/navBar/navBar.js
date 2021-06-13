import React from "react";
import { NavLink } from "react-router-dom";

const navbar = () => {
  return (
    <div className="navbar">
      {/* <img src="" alt="" /> */}
      <h1>Welcome to 1APP🍄</h1>
      <NavLink to="/videogames">Videogames</NavLink>
      <NavLink to="/genres">Genres</NavLink>
      <NavLink to="/videogame">Post new game</NavLink>
    </div>
  );
};

export default navbar;
