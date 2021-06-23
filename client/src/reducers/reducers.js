import {
  GET_ALLVIDEOGAMES,
  GET_GAMESBYNAME,
  GET_VIDEOGAMEDETAILS,
  POST_VIDEOGAME,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_GAMES,
} from "../Actions/Actions";

const initialState = {
  loadedVideogames: [],
  gamesByName: [],
  videgameDetails: {},
  allGenres: [],
  allPlatforms: [],
  currentGames: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLVIDEOGAMES:
      return {
        ...state,
        loadedVideogames: action.payload,
      };
    case GET_GAMESBYNAME:
      return {
        ...state,
        currentGames: action.payload,
      };
    case GET_VIDEOGAMEDETAILS:
      return {
        ...state,
        videgameDetails: { ...action.payload },
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        loadedVideogames: [...state.loadedVideogames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        allGenres: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload,
      };
    case FILTER_GAMES:
      return {
        ...state,
        currentGames: action.payload,
      };
    default:
      return state;
  }
}
