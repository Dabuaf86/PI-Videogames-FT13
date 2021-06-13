const axios = require("axios");

export const GET_VIDEOGAMES = "GET_VIDEOGAMES";
export const GET_VIDEOGAMEDETAILS = "GET_VIDEOGAMEDETAILS";
export const POST_VIDEOGAME = "POST_VIDEOGAME";
export const FILTER_VIDEOGAMES = "FILTER_VIDEOGAMES";
export const FILTER_GENRES = "FILTER_GENRES";
export const ORDER_VIDEOGAMES = "ORDER_VIDEOGAMES";

const url = "http://localhost:3001";

export const getVideogames = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogames?name=${name}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
export const getVideogameDetails = (id) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogame/${id}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
export const postVideogame = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogames?name=${name}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
export const filterVideogames = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogames?name=${name}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
export const filterGenres = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogames?name=${name}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
export const orderVideogames = (name) => async (dispatch) => {
  try {
    const req = await axios.get(`${url}videogames?name=${name}`);
    const data = await req.json();
    dispatch({
      type: GET_VIDEOGAMES,
      payload: data,
    });
  } catch (error) {
    alert("Game not found");
  }
};
