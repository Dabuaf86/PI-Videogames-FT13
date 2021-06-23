import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getVideogameDetails } from "../../Actions/Actions";
import "./GameDetails.css";

const GameDetails = () => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.videgameDetails);
  const { id } = useParams();

  useEffect(() => {
    dispatch(getVideogameDetails(id));
  }, [dispatch]);

  console.log(game);
  return (
    <div className="details">
      <img className="detailIMG" src={game.image} alt="" width="500px" />
      <h2 className="detailH2">{game.name}</h2>
      <p className="detailDescr">
        <b>Description: </b>
        {game.description}
      </p>
      <hr />
      <p>
        <b>Released on: </b>
        {game.released}
      </p>
      <p>
        <b>Rating: </b>
        {game.rating}⭐
      </p>
      <p>
        <b>Available for:</b>
        {(game.platforms &&
          game.platforms.map((plat) => {
            return <li className="liPlat">{plat.platform.name}</li>;
          })) ||
          (game.Platforms &&
            game.Platforms.map((plat) => {
              return <li className="liGen">{plat.name}</li>;
            }))}
      </p>
      <p>
        <b>Genres: </b>
        {(game.genres &&
          game.genres.map((gen) => {
            return <li className="liGen">{gen.name}</li>;
          })) ||
          (game.Genres &&
            game.Genres.map((genre) => {
              return <li className="liGen">{genre.name}</li>;
            }))}
      </p>
    </div>
  );
};

export default GameDetails;
