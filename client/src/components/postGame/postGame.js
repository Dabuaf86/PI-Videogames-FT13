import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postVideogame } from "../../Actions/Actions";

const PostVideogame = () => {
  const [input, setInput] = useState({
    name: "",
    description: "",
    released: "",
    rating: "",
    genres: "",
    platforms: "",
  });
  const dispatch = useDispatch();
  const createdVideogames = useSelector((state) => state.createdVideogames);
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

        <label>Description: *</label>
        <input
          type="text"
          name="description"
          value={input.description}
          onChange={handleInputChange}
        />

        <label>Released on:</label>
        <input
          type="text"
          name="released"
          value={input.released}
          onChange={handleInputChange}
        />

        <label>Rating:</label>
        <input
          type="text"
          name="rating"
          value={input.rating}
          onChange={handleInputChange}
        />

        <label>Genre/s: *</label>
        <input
          type="text"
          name="genre"
          value={input.genre}
          onChange={handleInputChange}
        />

        <label>Platform/s:</label>
        <input
          type="text"
          name="platform"
          value={input.platform}
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
