import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../Actions/Actions";
import Validate from "./Validate";

const PostVideogame = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    image_url: "",
  });
  const dispatch = useDispatch();
  // const createdVideogames = useSelector((state) => state.createdVideogames);
  const loadedVideogames = useSelector((state) => state.loadedVideogames);
  const selectGenre = useSelector((state) => state.allGenre);
  const selectPlatforms = useSelector((state) => state.allPlatforms);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPlatforms());
  }, [dispatch]);

  const [errors, setErrors] = useState(false);

  const handleInputChange = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
    
    setErrors(
      Validate({
        ...input,
        [event.target.name]: event.target.value,
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      errors.name ||
      errors.description ||
      errors.genres ||
      errors.platforms
    ) {
      setErrors(true);
      return;
    }
    setErrors(false);
    dispatch(postVideogame(input));
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
          onSelect={handleInputChange}
          multiple="true"
        >
          <option value="">select...</option>
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
          onSelect={handleInputChange}
          multiple="true"
        >
          <option value="">select...</option>
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

export default PostVideogame;
