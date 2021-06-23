import React from "react";
import { NavLink } from "react-router-dom";
import { getGamesByName } from "../../Actions/Actions";
import Search from "../Search/Search";
import "./NavBar.css";

const Navbar = () => {
  return (
    <header className="navbar">
      <span>
        <h1 id="navH1">Level APP</h1>
      </span>
      <nav>
        <ul>
          <li id="navlinks">
            <NavLink to="/videogames">Arcade Place</NavLink>
            <NavLink to="/newgame">Post a new game</NavLink>
          </li>
          <Search getGamesByName={getGamesByName} />
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
