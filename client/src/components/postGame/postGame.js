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
    image_url: "",
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
      input.genres.trim() === "" ||
      input.platforms.trim() === ""
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
          className={errors.name && "Error"}
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
        />
        {errors.name && <p className="Error">{errors.name}</p>}
        &nbsp;
        <label>Description: *</label>
        <input
          className={errors.description && "Error"}
          type="text"
          name="description"
          value={input.description}
          onChange={handleInputChange}
        />
        {errors.description && <p className="Error">{errors.description}</p>}
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
          className={errors.genres && "Error"}
          name="genres"
          id="genres"
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
          className={errors.platforms && "Error"}
          name="platforms"
          id="platforms"
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
    errors.genres = "You must choose at least one genre from the list";
  } else if (!input.platform) {
    errors.platforms = "You must choose at least one platform from the list";
  }
  return errors;
};

export default PostVideogame;
