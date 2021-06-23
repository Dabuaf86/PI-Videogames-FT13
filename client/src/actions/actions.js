const axios = require("axios");

export const GET_ALLVIDEOGAMES = "GET_ALLVIDEOGAMES";
export const GET_GAMESBYNAME = "GET_GAMESBYNAME";
export const GET_VIDEOGAMEDETAILS = "GET_VIDEOGAMEDETAILS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_BYGENRE = "FILTER_BYGENRE";
export const ORDER_ALPHABET = "ORDER_ALPHABET";
export const ORDER_BYRATING = "ORDER_BYRATING";
export const RESET = "RESET";
export const FILTER_GAMES = "FILTER_GAMES";

const URL = "http://localhost:3001";

export const getAllVideogames = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames`);
    // const data = await req.data;
    // console.log("QUE TRAIGO DEL BACK", data)
    // let paginado = req.data.slice(limit, limit + 15);
    dispatch({
      type: GET_ALLVIDEOGAMES,
      payload: req.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const getGamesByName = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames?name=${name}`);
    // let paginado = req.data.slice(limit, limit + 15);
    dispatch({
      type: GET_GAMESBYNAME,
      payload: req.data,
    });
  } catch (error) {
    alert("No games with that word in them were found in our database");
  }
};
export const getVideogameDetails = (id) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogame/${id}`);
    dispatch({
      type: GET_VIDEOGAMEDETAILS,
      payload: req.data,
    });
  } catch (error) {
    alert("Ups! something went wrong");
  }
};
export const postVideogame = (input) => async (dispatch) => {
  try {
    await axios.post(`${URL}/videogame`, input);
    dispatch({
      type: POST_VIDEOGAME,
      payload: input,
    });
  } catch (error) {
    console.error(error);
  }
};
export const getGenres = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/genres`);
    // const data = await req.data;
    // console.log("QUE TRAIGO DEL BACK", data)
    dispatch({
      type: GET_GENRES,
      payload: req.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const getPlatforms = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/platforms`);
    dispatch({
      type: GET_PLATFORMS,
      payload: req.data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const filterGames = (array) => () => {
  return (dispatch) => {
    dispatch({
      type: FILTER_GAMES,
      payload: array,
    });
  };
};
// export const filterByGenres = (genre) => (dispatch, getState) => {
//   let filteredGames = [];
//   if (genre === "Select") filteredGames = getState().loadedVideogames;
//   else
//     filteredGames = getState()
//       .loadedVideogames.map((game) => {
//         const genreFilter = game.genres.filter((g) => g.name === genre);
//         return genreFilter;
//       })
//       .dispatch({
//         type: FILTER_BYGENRE,
//         payload: {
//           genre,
//           gamesByGenre: filteredGames,
//         },
//       });
// };
// export const orderAlphabet = (order) => (dispatch, getState) => {
//   const filteredGames = getState().filteredVideogames;
//   let orderedGames = [];
//   if (order === "ALPHABET_ASC") {
//     orderedGames = filteredGames.sort((a, b) => {
//       if (a.name > b.name) return 1;
//       else if (a.name < b.name) return -1;
//       return 0;
//     });
//   } else if (order === "ALPHABET_DESC") {
//     orderedGames = filteredGames.sort((a, b) => {
//       if (a.name < b.name) return 1;
//       else if (a.name > b.name) return -1;
//       return 0;
//     });
//   }
//   dispatch({
//     type: "ORDER_ALPHABET",
//     payload: {
//       orderedGames,
//       order,
//     },
//   });
// };
// export const orderByRating = (order) => (dispatch, getState) => {
//   const filteredGames = getState().filteredVideogames;
//   let orderedGames = [];
//   if (order === "RATING_ASC") {
//     orderedGames = filteredGames.sort((a, b) => a.rating - b.rating);
//   } else if (order === "RATING_DESC") {
//     orderedGames = filteredGames.sort((a, b) => b.rating - a.rating);
//   }
//   dispatch({
//     type: "ORDER_BYRATING",
//     payload: {
//       orderedGames,
//       order,
//     },
//   });
// };
export const resetGames = () => (dispatch) =>
  dispatch({
    type: RESET,
  });
