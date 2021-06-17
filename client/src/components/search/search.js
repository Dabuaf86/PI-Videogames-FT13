import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGamesByName } from "../../Actions/Actions";
import "./Search.css";

const Search = ({ limit }) => {
  const [gameInput, setGameInput] = useState("");
  //   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  // const gamesByName = useSelector((state) => state.gamesByName);
  // useEffect(() => {
  //   dispatch(getGamesByName(gameInput, limit));
  // }, [dispatch, gameInput]);

  const handleChange = (event) => setGameInput(event.target.value);
  const handleClick = (event) => {
    event.preventDefault();
    // if (!gameInput) return alert("please type a game's name");
    // else {
    dispatch(getGamesByName(gameInput, limit));
    // }
  };

  return (
    <div className="searchDiv">
      {/* {loading && <Loader />} */}
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
