import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGamesByName } from "../../Actions/Actions";

const Search = () => {
  const [gameInput, setGameInput] = useState("");
  //   const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const gamesByName = useSelector((state) => state.gamesByName);
  useEffect(() => {
    dispatch(getGamesByName(gameInput));
  }, [dispatch]);
  
  const handleChange = (event) => {
    setGameInput(event.target.value);
  };
  const handleClick = (event) => {
    event.preventDefault();
    if (!gameInput) return alert("please type a game's name");
    else {
      getGamesByName(gameInput);
      setGameInput("");
    }
  };

  return (
    <div>
      {/* {loading && <Loader />} */}
      <input
        type="text"
        placeholder="search..."
        value={gameInput}
        onChange={handleChange}
      />
      <button onClick={handleClick}>🔍</button>
    </div>
  );
};

export default Search;
