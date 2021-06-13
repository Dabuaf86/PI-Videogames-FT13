import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getVideogames } from "../../actions/actions";

const home = ({ retrievedGames }) => {
  const [input, setInput] = useState("");
  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleClick = () => {
    getVideogames(input);
  };
  return (
    <div className="home">
      <div>
        <h2>Videogames</h2>
        <input onChange={handleChange} type="text" placeholder="search" />
        <button onClick={handleClick}>🔍</button>
      </div>
      <div>
        {retrievedGames.map((game) => (
          <div key={game.id}>
            <Link to={`videogames/${game.id}`}>
              {game.name}
              <img src={game.image} alt="game poster" width="200px" />
            </Link>
            {game.genre}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  retrievedGames: state.loadedVideogames,
});

export default connect(mapStateToProps, {})(home);
