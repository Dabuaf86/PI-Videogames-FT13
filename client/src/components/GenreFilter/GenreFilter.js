import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterGames, getGenres } from "../../Actions/Actions";
import "./GenreFilter.css";

const Filters = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const selectGenres = useSelector((state) => state.allGenres);
  const [filter, setFilter] = useState("Select");
  const [source, setSource] = useState("Select");
  const [order, setOrder] = useState("Select");

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  let gamesToFilter = [...loadedVideogames];

  const handleChange = (event) => {
    if (event.target.name === "filter") setFilter(event.target.value);
    else if (event.target.name === "source") setSource(event.target.value);
    else if (event.target.name === "order") setOrder(event.target.value);
  };

  // const filterBySource = (input) => {
  //   // let created = [];
  //   if (input === "created games") {
  //     gamesToFilter = gamesToFilter.filter((game) => game.id.includes("-"));
  //     dispatch(filterGames(gamesToFilter));
  //   } else if (input === "API games") {
  //     gamesToFilter = gamesToFilter.filter((game) => !game.id.includes("-"));
  //     dispatch(filterGames(gamesToFilter));
  //   } else return gamesToFilter;
  // };

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
    let filtered = [];
    if (filter === "Select" && source === "Select" && order === "Select")
      dispatch(filterGames(gamesToFilter));
    else if (filter === "Select") {
      if (source === "Select") {
        sortCB(gamesToFilter, order);
        dispatch(filterGames(gamesToFilter));
      } else if (order === "Select") {
        for (let i = 0; i < gamesToFilter.length; i++) {
          if (gamesToFilter[i].created === source) {
            filtered.push(gamesToFilter[i]);
          }
        }
      } else {
        for (let i = 0; i < gamesToFilter.length; i++) {
          if (gamesToFilter[i].created === source) {
            filtered.push(gamesToFilter[i]);
          }
        }
        sortCB(filtered, order);
        dispatch(filterGames(filtered));
      }
    } else if (filter !== "Select") {
      if (source === "Select" && order === "Select") {
        for (let i = 0; i < gamesToFilter.length; i++) {
          for (let j = 0; j < gamesToFilter[i].genres?.length; j++) {
            if (gamesToFilter[i].genres[j].name === filter) {
              filtered.push(gamesToFilter[i]);
            }
          }
        }
      } else if (source === "Select") {
        for (let i = 0; i < gamesToFilter.length; i++) {
          for (let j = 0; j < gamesToFilter[i].genres?.length; j++) {
            if (gamesToFilter[i].genres[j].name === filter) {
              filtered.push(gamesToFilter[i]);
            }
          }
        }
        sortCB(filtered, order);
        dispatch(filterGames(filtered));
      } else {
        for (let i = 0; i < gamesToFilter.length; i++) {
          if (gamesToFilter[i].created === source) {
            filtered.push(gamesToFilter[i]);
          }
        }
        filtered.map((game) => {
          let filteredX2 = [];
          game.genres?.map((genre) => {
            if (genre.name === filter) filteredX2.push(game);
          });
          console.log("ESTÁ TRAYENDO ALGO FILTEREDX2", filteredX2);
          filtered = filteredX2;
        });
        dispatch(filterGames(filtered));
      }
    } else {
      for (let i = 0; i < gamesToFilter.length; i++) {
        if (gamesToFilter[i].created === source) {
          filtered.push(gamesToFilter[i]);
        }
      }
      filtered.map((game) => {
        let filteredX2 = [];
        game.genres?.map((genre) => {
          if (genre.name === filter) filteredX2.push(game);
        });
        filtered = filteredX2;
      });
      sortCB(filtered, order);
      dispatch(filterGames(filtered));
    }
  };

  return (
    <div>
      <form className="filterForm" onSubmit={(event) => handleSubmit(event)}>
        <div className="filterDiv">
          <label className="filterLbl">Filter by Source</label>
          <select
            className="filterSelect"
            name="source"
            id={gamesToFilter.created}
            value={source}
            onChange={(event) => handleChange(event)}
          >
            <option value="Select" default>
              Select
            </option>
            <option value={"true"}>Created Games</option>
            <option value={"false"}>API RAW Games</option>
          </select>
        </div>
        <div className="filterDiv">
          <label className="filterLbl">Filter by Genre</label>
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
        <button id="btnSort" type="submit">
          Apply
        </button>
      </form>
    </div>
  );
};

export default Filters;
