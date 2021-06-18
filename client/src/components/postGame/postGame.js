import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../Actions/Actions";

const PostVideogame = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: "",
    platforms: "",
    image: "",
  });
  const dispatch = useDispatch();

  const createdVideogames = useSelector((state) => state.createdVideogames);

  const selectGenre = useSelector((state) => state.allGenre);

  const selectPlatforms = useSelector((state) => state.allPlatforms);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  useEffect(() => {
    dispatch(postVideogame(input));
  }, [dispatch]);

  const [errors, setErrors] = useState(false);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    setErrors(
      validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      input.name.trim() === "" ||
      input.description.trim() === "" ||
      input.genre.trim() === ""
    ) {
      setErrors(true);
      return;
    }
    setErrors(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div id="formDiv">
        <label>Name: *</label>
        <input
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        &nbsp;
        <label>Description: *</label>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={handleInputChange}
        />
        &nbsp;
        <label>Released on:</label>
        <input
          type="text"
          name="released"
          value={input.released}
          onChange={handleInputChange}
        />
        &nbsp;
        <label>Rating:</label>
        <input
          type="text"
          name="rating"
          value={input.rating}
          onChange={handleInputChange}
        />
        &nbsp;
        <label>Genre/s: *</label>
        <select
          name="genre"
          id="genre"
          value={input.genre}
          onChange={handleInputChange}
        >
          {selectGenre.map((genre) => (
            <option>{genre.name}</option>
          ))}
        </select>
        &nbsp;
        <label>Platform/s: *</label>
        <select
          name="platform"
          id="platform"
          value={input.platform}
          onChange={handleInputChange}
        >
          {selectPlatforms.map((platform) => (
            <option>{platform.name}</option>
          ))}
        </select>
        &nbsp;
        <input
          type="file"
          id="image"
          value={input.image}
          onChange={handleInputChange}
        />
      </div>
      <input value="Post game" type="submit" />
    </form>
  );
};

export const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Game's name is required";
  } else if (!input.description) {
    errors.description = "Game's description is required";
  } else if (!input.genres) {
    errors.genres = "You must add at least one genre from the list";
  }
  return errors;
};

export default PostVideogame;
