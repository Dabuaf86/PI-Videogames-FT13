import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetails } from "../../Actions/Actions";

const GameDetails = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.videgameDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogameDetails(id));
  }, [dispatch]);

  console.log(game);
  return (
    <div>
      <img src={game.image} alt="" width="500px" />
      <h2>{game.name}</h2>
      <p>
        <b>Description: </b>
        {game.description}
      </p>{" "}
      <hr />
      <p>
        <b>Released on: </b>
        {game.released}
      </p>
      <p>
        <b>Rating: </b>
        {game.rating}
      </p>
      <p>
        <b>Available for:</b>
       {game.platforms.map((plat) => {
          return <li>{plat.platform.name}</li>;
        })}
      </p>
      <p>
        <b>Genres: </b>
        {game.genres.map((gen) => {
          return <li>{gen.name}</li>;
        })}
      </p>
    </div>
  );
};

export default GameDetails;
