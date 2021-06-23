import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames, getGamesByName } from "../../Actions/Actions";
import Games from "../Games/Games";
import Pagination from "../Pagination/Pagination";
import Filters from "../GenreFilter/GenreFilter";
import "./Home.css";
import Search from "../Search/Search";

const Home2 = () => {
  // const [games, setGames] = useState([]);
  const dispatch = useDispatch();
  const currentGames = useSelector((state) => state.currentGames);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 15;

  useEffect(() => {
    // setLoading(true);
    dispatch(getAllVideogames());
    setLoading(false);
  }, []);

  const indexOfLastGame = currentPage * gamesPerPage;
  const indexOfFirstGame = indexOfLastGame - gamesPerPage;
  const mostrar = currentGames.slice(indexOfFirstGame, indexOfLastGame);
  const paginate = (num) => setCurrentPage(num);
  console.log("JUEGOS TRAIDOS", currentGames);
  return (
    <div className="home">
      <span className="filterBar">
        <Search getGamesByName={getGamesByName} />
        <Filters />
      </span>
      <Games loadedVideogames={mostrar} loading={loading} />
      <Pagination
        gamesPerPage={gamesPerPage}
        totalVideogames={currentGames.length}
        paginate={paginate}
      />
    </div>
  );
};

export default Home2;
