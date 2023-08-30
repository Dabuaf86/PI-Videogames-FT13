import {
	GET_ALLVIDEOGAMES,
	GET_GAMESBYNAME,
	GET_VIDEOGAMEDETAILS,
	CREATE_VIDEOGAME,
	GET_GENRES,
	GET_PLATFORMS,
	FILTER_GAMES,
} from './types';
const axios = require('axios');

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
		alert(`Oops!. We didn't find any games with ${name} in their name`);
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

export const createVideogame = payload => async dispatch => {
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
	dispatch({
		type: FILTER_GAMES,
		payload: array,
	});
};
