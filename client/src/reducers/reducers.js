import {
  GET_ALLVIDEOGAMES,
  TOTAL,
  GET_GAMESBYNAME,
  GET_VIDEOGAMEDETAILS,
  POST_VIDEOGAME,
  GET_GENRES,
  GET_PLATFORMS,
  // FILTER_VIDEOGAMES,
  // FILTER_GENRES,
  // ORDER_VIDEOGAMES,
} from "../Actions/Actions";

const initialState = {
  total: [],
  loadedVideogames: [],
  gamesByName: [],
  videgameDetails: {},
  createdVideogames: [],
  allGenre: [],
  allPlatforms: [],
  filteredVideogames: [],
  filteredGenres: [],
  orderedVideogames: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLVIDEOGAMES:
      return {
        ...state,
        loadedVideogames: action.payload,
      };
    case TOTAL:
      return {
        ...state,
        total: action.payload,
      };
    case GET_GAMESBYNAME:
      return {
        ...state,
        loadedVideogames: action.payload,
        // gamesByName: action.payload,
      };
    case GET_VIDEOGAMEDETAILS:
      return {
        ...state,
        videgameDetails: { ...action.payload },
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        createdVideogames: [...state.createdVideogames, action.payload],
      };
    case GET_GENRES:
      return {
        ...state,
        allGenre: action.payload,
      };
    case GET_PLATFORMS:
      return {
        ...state,
        allPlatforms: action.payload,
      };
    // case FILTER_VIDEOGAMES:
    //   return {
    //     ...state,
    //     filteredVideogames: state.filteredVideogames.filter(
    //       (game) => !game.name.includes(action.payload)
    //     ),
    //   };
    // case FILTER_GENRES:
    //   return {
    //     ...state,
    //   };
    // case ORDER_VIDEOGAMES:
    //   return {
    //     ...state,
    //     loadedVideogames: state.loadedVideogames.sort(),
    //   };
    default:
      return state;
  }
}
