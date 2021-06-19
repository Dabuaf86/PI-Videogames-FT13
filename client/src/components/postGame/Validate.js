const Validate = (input) => {
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

export default Validate;
