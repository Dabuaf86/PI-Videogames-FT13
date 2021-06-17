import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <span>
        <h1 id="navH1">Get 1APP🍄</h1>
      </span>
      <nav>
        <ul>
          <li id="navlinks">
            <NavLink to="/videogames">Arcade Place</NavLink>
            <NavLink to="/genres">Genres</NavLink>
            <NavLink to="/newgame">Post a new game</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
