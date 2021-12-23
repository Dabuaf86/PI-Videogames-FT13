const axios = require('axios');
// import axios from "axios"; fixed

export const GET_ALLVIDEOGAMES = 'GET_ALLVIDEOGAMES';
export const GET_GAMESBYNAME = 'GET_GAMESBYNAME';
export const GET_VIDEOGAMEDETAILS = 'GET_VIDEOGAMEDETAILS';
export const POST_VIDEOGAME = 'POST_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER_GAMES = 'FILTER_GAMES';

const URL = 'http://localhost:3001';

export const getAllVideogames = () => async dispatch => {
	try {
		const { data } = await axios.get(`${URL}/videogames`);
		dispatch({
			type: GET_ALLVIDEOGAMES,
			payload: data,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getGamesByName = name => async dispatch => {
	try {
		const req = await axios.get(`${URL}/videogames?name=${name}`);
		dispatch({
			type: GET_GAMESBYNAME,
			payload: req.data,
		});
	} catch (error) {
		alert(
			"We're sorry. We couldn't find that game in our database. Please try again."
		);
	}
};

export const getVideogameDetails = id => async dispatch => {
	try {
		const req = await axios.get(`${URL}/videogame/${id}`);
		dispatch({
			type: GET_VIDEOGAMEDETAILS,
			payload: req.data,
		});
	} catch (error) {
		alert('Something went wrong');
	}
};

export const postVideogame = input => async dispatch => {
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

export const getGenres = () => async dispatch => {
	try {
		const req = await axios.get(`${URL}/genres`);
		dispatch({
			type: GET_GENRES,
			payload: req.data,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getPlatforms = () => async dispatch => {
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

export const filterGames = array => dispatch => {
	try {
		dispatch({
			type: FILTER_GAMES,
			payload: array,
		});
	} catch (error) {
		console.log(error);
	}
};
