import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, getGenres } from "../../Actions/Actions";
import "./GenreFilter.css";

const Filters = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const currentGames = useSelector((state) => state.currentGames);
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
        if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (order === "alphDesc") {
      arr.sort((a, b) => {
        if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
        if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
        return 0;
      });
    }
    if (order === "ratingAsc") {
      arr.sort((a, b) => a.rating - b.rating);
    }
    if (order === "ratingDesc") {
      arr.sort((a, b) => b.rating - a.rating);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let filtrados = [];
    if (filter === "Select" && order === "Select")
      dispatch(filterGames(filteredGames));
    if (filter === "Select") {
      sortCB(filteredGames, order);
      dispatch(filterGames(filteredGames));
    }
    if (filter !== "Select") {
      for (let i = 0; i < filteredGames.length; i++) {
        for (let j = 0; j < filteredGames[i].genre?.length; j++) {
          if (filteredGames[i].genre[j].name === filter) {
            filtrados.push(filteredGames[i]);
          }
        }
      }
    }
    if (order !== "Select") {
      if (filtrados.length) {
        sortCB(filtrados, order);
        dispatch(filterGames(filtrados));
      } else {
        sortCB(filteredGames, order);
        dispatch(filterGames(filteredGames));
      }
    } else {
      if (filtrados.length) dispatch(filterGames(filtrados));
      else dispatch(filterGames(filteredGames));
    }
  };

  return (
    <div>
      <form className="filterForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="filterDiv">
          <label className="filterLbl">Filter</label>
          <select
            className="filterSelect"
            value={filter}
            name="filter"
            onChange={(event) => handleChange(event)}
          >
            <option default>Select</option>
            {selectGenres.map((genre) => (
              <option value={genre.name}>{genre.name}</option>
            ))}
          </select>
        </div>
        <button id="btnSort" type="submit">
          Apply
        </button>
        <div className="filterDiv">
          <label className="filterLbl">Sort</label>
          <select
            className="filterSelect"
            name="order"
            value={order}
            onChange={(event) => handleChange(event)}
          >
            <option value="Select" default>
              Select
            </option>
            <option value="alphAsc">A - Z</option>
            <option value="alphDesc">Z - A</option>
            <option value="ratingAsc">Rating (Lowest first)</option>
            <option value="ratingDesc">Rating (Highest first)</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Filters;
