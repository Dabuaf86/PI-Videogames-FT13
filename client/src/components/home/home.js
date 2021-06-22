import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGamesByName } from "../../Actions/Actions";
import Games from "../Games/Games";
import Pagination from "../Pagination/Pagination";
import GenreFilter from "../GenreFilter/GenreFilter";
import "./Home.css";
import Search from "../Search/Search";

const Home2 = () => {
  // const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  useEffect(() => {
    // setLoading(true);
    dispatch(getAllVideogames());
    setLoading(false);
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage; //15, 30, 45...
  const indexOfFirstGame = indexOfLastGame - gamesPerPage; //0, 15, 30...
  const currentGames = loadedVideogames.slice(
    indexOfFirstGame,
    indexOfLastGame
  );
  const paginate = (num) => setCurrentPage(num);

  return (
    <div className="home">
      <span className="filterBar">
        <Search getGamesByName={getGamesByName} />
        <GenreFilter />
      </span>
      <Games loadedVideogames={currentGames} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalVideogames={loadedVideogames.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home2;
