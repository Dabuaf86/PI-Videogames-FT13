/*
import React from "react";
import { postVideogame } from "../../Actions/Actions";

const PostVideogame = () => {
  const [input, setInput] = React.useState({
    name: "",
    description: "",
    released: "",
    rating: 0,
    genres: "",
    platforms: "",
  });
  const [errors, setErrors] = React.useState({});

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

  return (
    <form>
      <div>
        <div>
          <label>Name:</label>
          <input type="text" />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" />
        </div>
        <div>
          <label>Released on:</label>
          <input type="text" />
        </div>
        <div>
          <label>Rating:</label>
          <input type="text" />
        </div>
        <div>
          <label>Genre/s:</label>
          <input type="text" />
        </div>
        <div>
          <label>Platform/s:</label>
          <input type="text" />
        </div>
      </div>
      <input value="Post new game" type="submit" />
    </form>
  );
};

export const validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Game's name is required";
  }
  if (!input.description) {
    errors.description = "Game's description is required";
  }
  if (!input.genres) {
    errors.genres = "You must add at least one genre from the list";
  }
  return errors;
};
*/
