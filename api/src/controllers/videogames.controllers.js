const { Videogame, Genre } = require("../db");
const axios = require("axios").default;
const { API_KEY } = process.env;
const { GAMES_URL, GENRE_URL } = require("../utils/urls");
const { v4: UUIDV4 } = require("uuid");

const getGames = async (req, res, next) => {
  const { name, page } = req.query;
  if (!name) {
    try {
      const api100Games = [];
      let url = `${GAMES_URL}?key=${API_KEY}`;
      while (api100Games.length < 100) {
        const reqData = await axios.get(url);
        const data = reqData.data.results;
        url = reqData.data.next;
        data.forEach(async (obj) => {
          await api100Games.push({
            name: obj.name,
            genre: obj.genres,
            image: obj.background_image,
          });
        });
      }
      const gamesDB = await Videogame.findAll({ include: [Genre] });
      const allGames = [...gamesDB, ...api100Games];
      const gameList = allGames.slice(0, 15);
      return res.json(gameList);
    } catch (error) {
      next(error);
      // .status(500)
      // .json({ message: "Something went wrong", data: {} });
    }
  } else {
    try {
      const searchDB = await Videogame.findAll({
        where: { name: name },
        include: [Genre],
      });
      const searchAPI = await axios.get(
        `${GAMES_URL}?key=${API_KEY}&search=${name}`
      );
      const resulstByName = [...searchDB, ...searchAPI.data.results];
      return res.json(resulstByName);
    } catch (error) {
      next(error);
      // if (error.gamesAPI?.status === 404 || error.gamesDB?.status === 404)
      //   return res.json({ status: "404", message: "Game not found" });
    }
  }
};
const getOneGame = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id: id },
        include: { Genre },
      });
      res.json(gameDB);
    } else {
      const gameAPI = await axios.get(`${GAMES_URL}/${id}?key=${API_KEY}`);
      const data = gameAPI.data;
      const toRenderData = {
        name: data.name,
        description: data.description_raw,
        released: data.released,
        rating: data.rating,
        genres: data.genres,
        platforms: data.platforms.name,
        image: data.background_image, // short_screenshots
      };
      return res.json(toRenderData);
    }
  } catch (error) {
    return res.sendStatus(404).send({ message: "Game not found." });
  }
};
const getGenres = async (req, res) => {
  try {
    const genres = await axios.get(`${GENRE_URL}?key=${API_KEY}`);
    const result = genres.data.results;
    result.forEach(async (rtdo) => {
      await Genre.create({ name: rtdo.name });
    });
    const genre = await Genre.findAll();
    return res.json(genre);
  } catch (error) {
    return res.sendStatus(400);
  }
};
const PostGame = async (req, res) => {
  const { name, description, released, rating, platforms, genres, image_url } =
    req.body;
  try {
    // FALTA AGREGAR MANEJO DE COLISIONES PARA JUEGOS YA EXISTENTES
    const newGame = await Videogame.create({
      id: UUIDV4(),
      name: name,
      description: description,
      released: released,
      rating: rating,
      platforms: platforms,
      genre: genres,
      image: image_url,
    });
    // if (genre.length < 1)
    //   return res.render("error", {
    //     message: "You must select at least one genre for this game",
    //   });
    await newGame.setGenre(genres);
    return res.json({ message: "New game added to the list", data: newGame });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getGames,
  getOneGame,
  getGenres,
  PostGame,
};
