const axios = require("axios");

export const GET_ALLVIDEOGAMES = "GET_ALLVIDEOGAMES";
export const GET_GAMESBYNAME = "GET_GAMESBYNAME";
export const GET_VIDEOGAMEDETAILS = "GET_VIDEOGAMEDETAILS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";

const URL = "http://localhost:3001";

export const getAllVideogames = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames`);
    // const data = await req.data;
    // console.log("QUE TRAIGO DEL BACK", data)
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

export const postVideogame = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogame`);
    dispatch({
      type: POST_VIDEOGAME,
      payload: req.data,
    });
  } catch (error) {
    console.error(error);
  }
};
/*
export const filterVideogames = (payload) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames`);
    const data = await req.data.payload;
    dispatch({
      type: FILTER_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const filterGenres = (payload) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/genres`);
    const data = await req.data.payload;
    dispatch({
      type: FILTER_GENRES,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
export const orderVideogames = (payload) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}videogames`);
    const data = await req.data.payload;
    dispatch({
      type: ORDER_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    console.error(error);
  }
};
*/
