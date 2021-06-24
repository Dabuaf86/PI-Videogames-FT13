const Validate = (input) => {
  let errors = {};
  if (!input.name) {
    errors.name = "Game's name is required";
  } else if (!input.description) {
    errors.description = "Game's description is required";
  } else if (input.genres === "Select") {
    errors.genres = "You must choose at least one genre from the list";
  } else if (input.platform === "Select") {
    errors.platforms = "You must choose at least one platform from the list";
  }
  return errors;
};

export default Validate;
