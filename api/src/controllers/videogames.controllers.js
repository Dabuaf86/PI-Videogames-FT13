const { Videogame, Genre, Platform } = require("../db");
const axios = require("axios").default;
const { API_KEY } = process.env;
const { GAMES_URL } = require("../utils/urls");
const { v4: UUIDV4 } = require("uuid");

const getGames = async (req, res, next) => {
  const { name } = req.query;
  if (name) {
    try {
      const searchDB = await Videogame.findAll({
        where: { name: name },
        include: [{ model: Genre, attributes: ["name"] }],
      });
      const searchAPI = await axios.get(
        `${GAMES_URL}?key=${API_KEY}&search=${name}`
      );
      const newSearch = [];
      searchAPI.data.results.forEach((obj) => {
        newSearch.push({
          id: obj.id,
          name: obj.name,
          genre: obj.genres,
          image: obj.background_image,
        });
      });
      const resulstByName = [...searchDB, ...newSearch];
      return res.json(resulstByName);
    } catch (error) {
      next(error);
      // if (error.gamesAPI?.status === 404 || error.gamesDB?.status === 404)
      //   return res.json({ status: "404", message: "Game not found" });
    }
  } else {
    try {
      const api100Games = [];
      let url = `${GAMES_URL}?key=${API_KEY}`;
      while (api100Games.length < 100) {
        const reqData = await axios.get(url);
        const data = reqData.data.results;
        url = reqData.data.next;
        data.forEach(async (obj) => {
          await api100Games.push({
            id: obj.id,
            name: obj.name,
            genre: obj.genres,
            image: obj.background_image,
          });
        });
      }
      const gamesDB = await Videogame.findAll({ include: [Genre] });
      const allGames = [...gamesDB, ...api100Games];
      // const gameList = allGames.slice(0, 15);
      return res.json(allGames);
    } catch (error) {
      next(error);
      // .status(500)
      // .json({ message: "Something went wrong", data: {} });
    }
  }
};
const getOneGame = async (req, res) => {
  const { id } = req.params;
  try {
    if (id.includes("-")) {
      const gameDB = await Videogame.findOne({
        where: { id: id },
        include: [
          { model: Genre, attributes: ["name"], through: { attributes: [] } },
          {
            model: Platform,
            attributes: ["name"],
            through: { attributes: [] },
          },
        ],
      });
      res.json(gameDB);
    } else {
      const gameAPI = await axios.get(`${GAMES_URL}/${id}?key=${API_KEY}`);
      const data = gameAPI.data;
      const toRenderData = {
        image: data.background_image, // short_screenshots
        name: data.name,
        description: data.description_raw,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms,
        genres: data.genres,
      };
      return res.json(toRenderData);
    }
  } catch (error) {
    return res.sendStatus(404).send({ message: "Game not found." });
  }
};
const getGenres = async (req, res) => {
  try {
    // const genres = await axios.get(`${GENRE_URL}?key=${API_KEY}`);
    // const result = genres.data.results;
    // result.forEach(async (rtdo) => {
    //   await Genre.create({ name: rtdo.name });
    // });
    const genre = await Genre.findAll();
    return res.json(genre);
  } catch (error) {
    return res.sendStatus(400);
  }
};
const getPlatforms = async (req, res) => {
  try {
    const platform = await Platform.findAll();
    return res.json(platform);
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
      image: image_url,
    });
    // if (genre.length < 1)
    //   return res.render("error", {
    //     message: "You must select at least one genre for this game",
    //   });
    await newGame.addGenre(genres);
    await newGame.addPlatform(platforms);
    res.send({
      message: "New game added to the list",
      data: newGame,
    });
  } catch (error) {
    return res.send(error);
  }
};

module.exports = {
  getGames,
  getOneGame,
  getGenres,
  getPlatforms,
  PostGame,
};
