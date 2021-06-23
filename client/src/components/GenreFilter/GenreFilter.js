import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterGames,
  // filterByGenres,
  getGenres,
  // orderAlphabet,
  // orderByRating,
} from "../../Actions/Actions";
import "./GenreFilter.css";

const Filters = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const selectGenres = useSelector((state) => state.allGenres);
  const [filter, setFilter] = useState("Select");
  const [order, setOrder] = useState("Select");

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  let filteredGames = [...loadedVideogames];

  const handleChange = (event) => {
    if (event.target.name === "filter") setFilter(event.target.value);
    else if (event.target.name === "order") setOrder(event.target.value);
  };

  const sortCB = (arr, order) => {
    if (order === "alphAsc") {
      arr.sort((a, b) => {
        if (a.name > b.name) return 1;
        else if (a.name < b.name) return -1;
        return 0;
      });
    } else if (order === "alphDesc") {
      arr.sort((a, b) => {
        if (a.name < b.name) return 1;
        else if (a.name > b.name) return -1;
        return 0;
      });
    } else if (order === "ratingAsc") {
      arr.sort((a, b) => a.rating - b.rating);
    } else if (order === "ratingDesc") {
      arr.sort((a, b) => b.rating - a.rating);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let filtrados = [];
    if (filter !== "Select") {
      for (let i = 0; i < filteredGames.length; i++) {
        for (let j = 0; j < filteredGames[i].genre?.length; j++) {
          if (filteredGames[i].genre[j].name === filter) {
            filtrados.push(filteredGames[i]);
          }
        }
      }
    }
    // filteredGames = filteredGames.map(game => {
    //   let genreFilt = [];
    //   game.genre
    //   for (let i = 0; i < game.genre.length; i++) {
    //     genreFilt.push(game.genre[i].name)
    //   }
    //   genreFilt = genreFilt.filter(game => game.includes(filter))
    // })
    else if (order !== "Select") {
      if (filtrados.length > 0) {
        sortCB(filtrados, order);
        dispatch(filterGames(filtrados));
      } else {
        sortCB(filteredGames, order);
        dispatch(filterGames(filteredGames));
      }
    }
  };

  return (
    <div>
      <form onSubmit={(event) => handleSubmit(event)}>
        <label>Filter by genre</label>
        <select
          value={filter}
          name="filter"
          onChange={(event) => handleChange(event)}
        >
          <option default>Select</option>
          {selectGenres.map((genre) => (
            <option value={genre.name}>{genre.name}</option>
          ))}
        </select>
        <label>Order</label>
        <select
          name="order"
          value={order}
          onChange={(event) => handleChange(event)}
        >
          <option value="Select" default>
            Select
          </option>
          <option value="alphAsc">Alphabetically (A-Z)</option>
          <option value="alphDesc">Alphabetically (Z-A)</option>
          <option value="ratingAsc">Rating (Lowest first)</option>
          <option value="ratingDesc">Rating (Highest first)</option>
        </select>
        <button type="submit">send</button>
      </form>
    </div>
  );
};

export default Filters;
