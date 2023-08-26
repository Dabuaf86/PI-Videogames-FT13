import {
	GET_ALLVIDEOGAMES,
	GET_GAMESBYNAME,
	GET_VIDEOGAMEDETAILS,
	POST_VIDEOGAME,
	GET_GENRES,
	GET_PLATFORMS,
	FILTER_GAMES,
} from '../Actions/Actions';

const initialState = {
	loadedVideogames: [],
	gamesByName: [],
	videogameDetails: {},
	allGenres: [],
	allPlatforms: [],
	currentGames: [],
	isLoaded: false,
};

export default function rootReducer(state = initialState, {type, payload}) {
	switch (type) {
		case GET_ALLVIDEOGAMES:
			return {
				...state,
				loadedVideogames: payload,
				isLoaded: true,
			};
		case GET_GAMESBYNAME:
			return {
				...state,
				currentGames: payload,
				isLoaded: true,
			};
		case GET_VIDEOGAMEDETAILS:
			return {
				...state,
				videogameDetails: { ...payload },
			};
		case POST_VIDEOGAME:
			return {
				...state,
				loadedVideogames: [...state.loadedVideogames, payload],
				isLoaded: false,
			};
		case GET_GENRES:
			return {
				...state,
				allGenres: payload,
			};
		case GET_PLATFORMS:
			return {
				...state,
				allPlatforms: payload,
			};
		case FILTER_GAMES:
			return {
				...state,
				currentGames: payload,
			};
		default:
			return state;
	}
}
