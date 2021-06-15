import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllVideogames } from "../../Actions/Actions";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);

  useEffect(() => {
    dispatch(getAllVideogames());
  }, [dispatch]);

  // const handleClickPrev = (event) => {};
  // const handleClickNext = (event) => {};
  return (
    <div>
      {loadedVideogames.length === 0 ? (
        <h2>Loading...Please wait</h2>
      ) : (
        loadedVideogames
          .map((game) => (
            <div key={game.id}>
              <Link to={`/videogame/${game.id}`}>
                <h2>{game.name}</h2>
                <img src={game.image} alt="game poster" width="300px" />
              </Link>
              <span>
                {game.genre.map((el) => {
                  return <li>{el.name}</li>;
                })}
              </span>
            </div>
          ))
          .slice(0, 15)
      )}
      {/* <div>
        <button onClick={handleClickPrev}>previous</button>
        <button onClick={handleClickNext}>next</button>
      </div> */}
    </div>
  );
};
export default Home;
