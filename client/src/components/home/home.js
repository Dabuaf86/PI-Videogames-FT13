import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGamesByName } from "../../Actions/Actions";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  // const handleClickPrev = (event) => {};
  // const handleClickNext = (event) => {};
  return (
    <div className="home">
      <span id="search">
        <Search getGamesByName={getGamesByName} />
      </span>
      <div className="gamesContainer">
        {loadedVideogames.length === 0 ? (
          <h2 className="homeH2">Loading...Please wait</h2>
        ) : (
          loadedVideogames
            .map((game) => (
              <div className="games" key={game.id}>
                <Link to={`/videogame/${game.id}`}>
                  <h2>{game.name}</h2>
                  <img className="homeIMG" src={game.image} alt="game poster" />
                </Link>
                <>
                  {game.genre.map((el) => {
                    return <li className="homeLi">{el.name}</li>;
                  })}
                </>
              </div>
            ))
            .slice(0, 15)
        )}
        {/* <div>
        <button onClick={handleClickPrev}>previous</button>
        <button onClick={handleClickNext}>next</button>
      </div> */}
      </div>
    </div>
  );
};
export default Home;
