import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByGenres,
  getGenres,
  orderAlphabet,
  orderByRating,
} from "../../Actions/Actions";
import "./GenreFilter.css";

const Filters = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const selectGenres = useSelector((state) => state.allGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleFilter = (event) => {
    dispatch(filterByGenres(event.target.value));
  };

//   const handleOrder = (event) => {
//     if (
//       event.target.value === ALPHABET_ASC ||
//       event.target.value === ALPHABET_ASC
//     )
//       dispatch(orderAlphabet(event.target.value));
//     else if (
//       event.target.value === RATING_ASC ||
//       event.target.value === RATING_DESC
//     )
//       dispatch(orderByRating(event.target.value));
//     else return loadedVideogames;
//   };

//   return (
//     <div>
//       <label>Filter by genre</label>
//       <select name="genres" onChange={(event) => handleFilter(event)}>
//         <option default>Select</option>
//         {selectGenres.map((genre) => (
//           <option value={genre.name}>{genre.name}</option>
//         ))}
//       </select>
//       <label>Order</label>
//       <select onChange={(event) => handleOrder(event)}>
//         <option value="Select" default>
//           Select
//         </option>
//         <option value="ALPHABET_ASC">Alphabetically (A-Z)</option>
//         <option value="ALPHABET_DESC">Alphabetically (Z-A)</option>
//         <option value="RATING_ASC">Rating (Lowest first)</option>
//         <option value="RATING_DESC">Rating (Highest first)</option>
//       </select>
//     </div>
//   );
};

export default Filters;
