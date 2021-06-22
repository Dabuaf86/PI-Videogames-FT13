import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../Actions/Actions";
import Validate from "./Validate";
import "./PostGame.css";

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
  const selectGenres = useSelector((state) => state.allGenres);
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
  // const handleSelectorChange = (event) => {
  //   if (event.target.name === "genres")
  //     setInput(genres.push(event.target.value));
  //   else if (event.target.name === "platforms")
  //     setInput(platforms.push(event.target.value));
  // };

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
    <div>
      <h2 className="formH2">Post a new videogame</h2>
      <form className="postGame" onSubmit={handleSubmit}>
        <label>*Name</label>
        <input
          id="formInput"
          className={errors.name && "Error"}
          type="text"
          name="name"
          value={input.name}
          onChange={handleInputChange}
          placeholder="Name...*"
        />
        <hr />
        {errors.name && <p className="Error">{errors.name}</p>}
        <label>*Description</label>
        <input
          id="formInput"
          className={errors.description && "Error"}
          type="text"
          name="description"
          value={input.description}
          onChange={handleInputChange}
          placeholder="Description...*"
        />
        <hr />
        {errors.description && <p className="Error">{errors.description}</p>}
        <label>Released (YYYY/MM/DD)</label>
        <input
          id="formInput"
          type="text"
          name="released"
          value={input.released}
          onChange={handleInputChange}
          placeholder="Released date..."
        />
        <hr />
        <label>Rating (0-5)</label>
        <input
          id="formInput"
          type="text"
          name="rating"
          value={input.rating}
          onChange={handleInputChange}
          placeholder="Rating..."
        />
        <hr />
        <span className="formSpan">
          <span className="selectSpan">
            <label>*Genres (at least one)</label>
            <select
              multiple={true}
              id="formInput"
              className={errors.genres && "Error"}
              name="genres"
              value={input.genre}
              onSelect={handleInputChange}
              // multiple="true"
              placeholder="Select genre/s"
            >
              <option value="">select...</option>
              {selectGenres.map((genre) => (
                <option>{genre.name}</option>
              ))}
            </select>
          </span>
          <span className="selectSpan">
            <label>*Platforms (at least one)</label>
            <select
              multiple={true}
              id="formInput"
              className={errors.platforms && "Error"}
              name="platforms"
              value={input.platform}
              // onSelect={handleSelectorChange}
              // multiple="true"
              placeholder="Select genre/s"
            >
              <option value="">select...</option>
              {selectPlatforms.map((platforms) => (
                <option>{platforms.name}</option>
              ))}
            </select>
          </span>
        </span>
        <hr />
        <label>Upload game's image</label>
        <input
          id="formInput"
          // name="upload file"
          type="file"
          id="image"
          value={input.image}
          // onChange={handleSelectorChange}
        />
        <hr />
        {/* <label>*New Genres (at least one)</label>
        <div>
          {selectGenres.map((genre) => (
            <div key={genre.name}>
              <input type="checkbox" name="genres" value={genre.name}></input>
              <label name={genre}>{genre.name}</label>
            </div>
          ))}
        </div>
        <hr /> */}
        <input value="Post game" type="submit" />
      </form>
      <footer className="formFooter">
        Fields marked with *, are mandatory to create a game.
      </footer>
    </div>
  );
};

export default PostVideogame;
