const axios = require('axios');
// import axios from "axios"; fixed

export const GET_ALLVIDEOGAMES = 'GET_ALLVIDEOGAMES';
export const GET_GAMESBYNAME = 'GET_GAMESBYNAME';
export const GET_VIDEOGAMEDETAILS = 'GET_VIDEOGAMEDETAILS';
export const CREATE_VIDEOGAME = 'CREATE_VIDEOGAME';
export const GET_GENRES = 'GET_GENRES';
export const GET_PLATFORMS = 'GET_PLATFORMS';
export const FILTER_GAMES = 'FILTER_GAMES';

// const URL = 'http://localhost:3001';

export const getAllVideogames = () => async dispatch => {
	try {
		const { data } = await axios.get(`/videogames`);
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
		const req = await axios.get(`/videogames?name=${name}`);
		dispatch({
			type: GET_GAMESBYNAME,
			payload: req.data,
		});
	} catch (error) {
		alert(`Oops!. We didn't find any games with ${name} in their name`);
	}
};

export const getVideogameDetails = id => async dispatch => {
	try {
		const req = await axios.get(`/videogame/${id}`);
		dispatch({
			type: GET_VIDEOGAMEDETAILS,
			payload: req.data,
		});
	} catch (error) {
		alert('Something went wrong');
	}
};

export const postVideogame = payload => async dispatch => {
	try {
		await axios.post(`${URL}/videogame`, payload);
		dispatch({
			type: CREATE_VIDEOGAME,
			payload,
		});
	} catch (error) {
		console.error(error);
	}
};

export const getGenres = () => async dispatch => {
	try {
		const req = await axios.get(`/genres`);
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
		const req = await axios.get(`/platforms`);
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
