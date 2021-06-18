const axios = require("axios");

export const GET_ALLVIDEOGAMES = "GET_ALLVIDEOGAMES";
export const TOTAL = "TOTAL";
export const GET_GAMESBYNAME = "GET_GAMESBYNAME";
export const GET_VIDEOGAMEDETAILS = "GET_VIDEOGAMEDETAILS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const GET_GENRES = "GET_GENRES";
export const GET_PLATFORMS = "GET_PLATFORMS";
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";

const URL = "http://localhost:3001";

export const getTotal = () => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames`);
    dispatch({
      type: TOTAL,
      payload: req.data.length,
    });
  } catch (error) {
    console.error(error);
  }
};

export const getAllVideogames = (limit) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames`);
    // const data = await req.data;
    // console.log("QUE TRAIGO DEL BACK", data)
    let paginado = req.data.slice(limit, limit + 15);
    dispatch({
      type: GET_ALLVIDEOGAMES,
      payload: paginado,
    });
  } catch (error) {
    console.error(error);
  }
};
export const getGamesByName = (name, limit) => async (dispatch) => {
  try {
    const req = await axios.get(`${URL}/videogames?name=${name}`);
    let paginado = req.data.slice(limit, limit + 15);
    dispatch({
      type: GET_GAMESBYNAME,
      payload: paginado,
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
