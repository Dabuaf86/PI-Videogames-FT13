import {
  GET_ALLVIDEOGAMES,
  GET_GAMESBYNAME,
  GET_VIDEOGAMEDETAILS,
  POST_VIDEOGAME,
  GET_GENRES,
  GET_PLATFORMS,
  FILTER_BYGENRE,
  ORDER_ALPHABET,
  ORDER_BYRATING,
  RESET,
} from "../Actions/Actions";

const initialState = {
  loadedVideogames: [],
  gamesByName: [],
  videgameDetails: {},
  // createdVideogames: [],
  allGenres: [],
  allPlatforms: [],
  filteredVideogames: [],
  filteredGenres: [],
  orderedVideogames: [],
  orderBy: "Select",
  filterBy: "Select",
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
    case RESET:
      return {
        ...state,
        loadedVideogames: [],
        filteredVideogames: [],
        orderBy: "Select",
        filterBy: "Select",
      };
    case FILTER_BYGENRE:
      return {
        ...state,
        filteredVideogames: action.payload.gamesByGenre,
        filterBy: action.payload.genre,
      };
    case ORDER_ALPHABET:
    case ORDER_BYRATING:
      return {
        ...state,
        filteredVideogames: action.payload.orderedGames,
        orderBy: action.payload.order,
      };
    default:
      return state;
  }
}

/*
+++++CONCEPTO DE FILTRADO POR GENRE+++++
reducer = () => {
    const getGamesByGenre = (payload) => {
        type: GETGAMESBYGENRE,
        payload
    }
}

case: GETGAMESBYGENRE {
    return {
        ...state,
        juegosporgenero: loadedVideogames.map(games => {
            let gamesByGenre = [];
            games.genre.map(genre => {
                if (genre.name === payload) gamesByGenre.push(games)
            })
              return gamesByGenre  
            });
        })
    }
}
*/
