import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getGamesByName } from "../../Actions/actions";
import "./Search.css";

const Search = () => {
  const [gameInput, setGameInput] = useState("");
  const dispatch = useDispatch();

  const handleChange = (event) => setGameInput(event.target.value);
  const handleClick = (event) => {
    event.preventDefault();
    if (!gameInput) return alert("please type a game's name");
    else {
      dispatch(getGamesByName(gameInput));
      setGameInput("");
    }
  };

  return (
    <div className="searchDiv">
      <input
        id="search"
        type="text"
        placeholder="search..."
        value={gameInput}
        onChange={handleChange}
      />
      <button id="btnSearch" onClick={handleClick}>
        🔍
      </button>
    </div>
  );
};

export default Search;
// fixed