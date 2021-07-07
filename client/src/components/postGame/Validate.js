const Validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Game's name is required";
  } else if (!input.description) {
    errors.description = "Game's description is required";
  } else if (input.genres === "Select" || input.genres === "") {
    errors.genres = "You must choose at least one valid genre from the list";
  } else if (input.platforms === "Select" || input.platforms === "") {
    errors.platforms =
      "You must choose at least one valid platform from the list";
  }
  return errors;
};

export default Validate;
