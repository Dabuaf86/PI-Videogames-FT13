import {
  GET_VIDEOGAMES,
  GET_VIDEOGAMEDETAILS,
  POST_VIDEOGAME,
  FILTER_VIDEOGAMES,
  FILTER_GENRES,
  ORDER_VIDEOGAMES,
} from "../actions/actions";

const initialState = {
  loadedVideogames: [],
  videgameDetails: {},
  createdVideogames: [],
  filteredVideogames: [],
  filteredGenres: [],
  orderedVideogames: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        loadedVideogames: action.payload.Search,
      };
    case GET_VIDEOGAMEDETAILS:
      return {
        ...state,
        videgameDetails: action.payload,
      };
    case POST_VIDEOGAME:
      return {
        ...state,
        createdVideogames: [...state.createdVideogames, action.payload],
      };
    case FILTER_VIDEOGAMES:
      return {
        ...state,
        filteredVideogames: state.filteredVideogames.filter(
          (game) => !game.name.includes(action.payload)
        ),
      };
    case FILTER_GENRES:
      return {
        ...state,
      };
    case ORDER_VIDEOGAMES:
      return {
        ...state,
        loadedVideogames: state.loadedVideogames.sort(),
      };
    default:
      return state;
  }
}
