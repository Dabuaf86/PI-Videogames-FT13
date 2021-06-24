import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame, getGenres, getPlatforms } from "../../Actions/Actions";
// import Validate from "./Validate";
import "./PostGame.css";

const PostVideogame = () => {
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: [],
    platforms: [],
    image: "",
  });
  const selectGenres = useSelector((state) => state.allGenres);
  const selectPlatforms = useSelector((state) => state.allPlatforms);

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
  }, [dispatch]);

  // const [errors, setErrors] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.name === "genres" || event.target.name === "platforms") {
      const selectArr = input[event.target.name];
      setInput({
        ...input,
        [event.target.name]: [...selectArr, event.target.value],
      });
    } else {
      setInput({
        ...input,
        [event.target.name]: event.target.value,
      });
    }
    // setErrors(
    //   Validate({
    //     ...input,
    //     [event.target.name]: event.target.value,
    //   })
    // );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // if (
    //   errors.name ||
    //   errors.description ||
    //   errors.genres ||
    //   errors.platforms
    // ) {
    //   setErrors(true);
    //   return;
    // } else {
    // setErrors(false);
    if (!input.name) {
      alert("Please type a name");
      return;
    } else if (!input.description) {
      alert("Please type a description");
      return;
    } else if (!input.genres || input.genres === "Select") {
      alert("Please select at least one valid genre");
      return;
    } else if (!input.platforms || input.platforms === "Select") {
      alert("Please select at least one valid platform");
      return;
    } else {
      dispatch(postVideogame(input));
      alert("New videogame created successfully!");
      setInput({
        name: "",
        description: "",
        released: "",
        rating: "",
        genres: [],
        platforms: [],
        image: "",
      });
    }
  };

  return (
    <div className="formContainer">
      <h2 className="formH2">Post a new videogame</h2>
      <form
        className="postGame"
        noValidate
        onSubmit={(event) => handleSubmit(event)}
        onChange={(event) => handleInputChange(event)}
      >
        <label className="formLbl">*Name</label>
        <input
          id="formInput"
          // className={errors.name && "Error"}
          type="text"
          name="name"
          value={input.name}
          placeholder="Name..."
        />
        <hr />
        {/* {errors.name && <p className="Error">{errors.name}</p>} */}
        <label className="formLbl">*Description</label>
        <input
          id="formInput"
          // className={errors.description && "Error"}
          type="text"
          name="description"
          value={input.description}
          placeholder="Description..."
        />
        <hr />
        {/* {errors.description && <p className="Error">{errors.description}</p>} */}
        <label className="formLbl">Released</label>
        <input
          id="formInput"
          type="date"
          name="released"
          value={input.released}
          placeholder="Released date..."
        />
        <hr />
        <label className="formLbl">Rating (0-5)</label>
        <input
          id="formInput"
          type="number"
          name="rating"
          value={input.rating}
          placeholder="Rating..."
        />
        <hr />
        <span className="formSpan">
          <span className="selectSpan">
            <label className="formLbl">*Genres (at least one)</label>
            <select
              id="formInput"
              // className={errors.genres && "Error"}
              name="genres"
              multiple={true}
            >
              <option defaultValue={null}>Select</option>
              {selectGenres.map((genre) => (
                <option value={genre.id}>{genre.name}</option>
              ))}
            </select>
          </span>
          <span className="selectSpan">
            <label className="formLbl">*Platforms (at least one)</label>
            <select
              id="formInput"
              // className={errors.platforms && "Error"}
              name="platforms"
              multiple={true}
            >
              <option defaultValue={null}>Select</option>
              {selectPlatforms.map((platforms) => (
                <option value={platforms.id}>{platforms.name}</option>
              ))}
            </select>
          </span>
        </span>
        <hr />
        <label>Enter game's image url</label>
        <input
          id="formInput"
          name="image"
          type="url"
          value={input.image}
          placeholder="http://.../*.jpg"
        />
        <hr />
        <button className="formBtn" type="submit">
          Post game
        </button>
      </form>
      <footer className="formFooter">
        Fields marked with *, are mandatory to create a game.
      </footer>
    </div>
  );
};

export default PostVideogame;
