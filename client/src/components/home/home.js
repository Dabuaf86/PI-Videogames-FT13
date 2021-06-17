import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVideogames,
  getGamesByName,
  getTotal,
} from "../../Actions/Actions";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const [limit, SetLimit] = useState(0);
  const total = useSelector((state) => state.total);
  // const [paginado, SetPaginado] = useState([]);
  // const [flag, setFlag] = useState(false);
  const allGamesUnchanged = [];
  // 2 hooks uno contiene el slice del paginado y el anterior 
  let page = 1;

  useEffect(() => {
    dispatch(getTotal());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllVideogames(limit));
    // setFlag(true);
  }, [dispatch, page, limit]);

  // useEffect(() => {
  //   if (flag) {
  //     SetPaginado(loadedVideogames.slice(0, 15));
  //   }
  // }, [flag]);

  // const fragmentedGames = () => {
  //   return loadedVideogames.slice(limit, limit + 15);
  // };

  const handleClickPrev = (event) => {
    if (limit >= 0) {
      if (limit === 0) SetLimit(0);
      else SetLimit(limit - 15);
      // dispatch(getAllVideogames(limit));
      // SetPaginado(fragmentedGames());
      page--;
    }
  };
  const handleClickNext = (event) => {
    if (Math.floor(total / (page + 1)) >= 15) {
      SetLimit(limit + 15);
      // dispatch(getAllVideogames(limit));
      // SetPaginado(fragmentedGames());
      page++;
    }
  };
  console.log(loadedVideogames);
  return (
    <div className="home">
      <span id="search">
        <Search getGamesByName={getGamesByName} limit={limit} />
      </span>
      <div className="gamesContainer">
        {loadedVideogames && loadedVideogames.length === 0 ? (
          <h2 className="homeH2">Loading...Please wait</h2>
        ) : (
          loadedVideogames &&
          loadedVideogames.map((game) => (
            <div className="games" key={game.id}>
              <Link to={`/videogame/${game.id}`}>
                <h2>{game.name}</h2>
                <img className="homeIMG" src={game.image} alt="game poster" />
              </Link>
              <>
                {game.genre &&
                  game.genre.map((el) => {
                    return <li className="homeLi">{el.name}</li>;
                  })}
              </>
            </div>
          ))
        )}
        <div>
          <button onClick={handleClickPrev}>previous</button>&nbsp;
          <button onClick={handleClickNext}>next</button>
        </div>
      </div>
    </div>
  );
};
export default Home;
