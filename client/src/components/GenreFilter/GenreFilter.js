import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres } from "../../Actions/Actions";
import "./GenreFilter.css";

const GenreFilter = () => {
  const dispatch = useDispatch();
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const selectGenres = useSelector((state) => state.allGenres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  //   const handleInputChange = (event) => {
  //     setInput({
  //       ...input,
  //       [event.target.name]: event.target.value,
  //     });

  return (
    <select name="genre">
      <option value="">select a genre</option>
      {selectGenres.map((genre) => (
        <option>{genre.name}</option>
      ))}
    </select>
  );
};

export default GenreFilter;
