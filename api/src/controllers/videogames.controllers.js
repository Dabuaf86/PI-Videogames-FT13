const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios').default;
const { API_KEY } = process.env;
const { GAMES_URL } = require('../utils/urls');
const { v4: UUIDV4 } = require('uuid');

const getGames = async (req, res, next) => {
	const { name } = req.query;
	if (name) {
		try {
			const searchDB = await Videogame.findAll({
				where: { name: name },
				include: [{ model: Genre, attributes: ['name'] }],
			});
			console.log('JUEGOS DB', searchDB);
			const foundDB = [];
			searchDB.forEach(game => {
				const { id, name, Genres, image, rating, created } = game;
				foundDB.push({
					id,
					name,
					genres: Genres,
					image,
					rating,
					created,
				});
			});
			const searchAPI = await axios.get(
				`${GAMES_URL}?key=${API_KEY}&search=${name}`
			);
			const foundAPI = [];
			searchAPI.data.results.forEach(obj => {
				const { id, name, genres, background_image, rating } = obj;
				foundAPI.push({
					id,
					name,
					genres,
					image: background_image,
					rating,
					created: false,
				});
			});
			const resulstByName = [...foundDB, ...foundAPI];
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
				data.forEach(async obj => {
					const { id, name, genres, background_image, rating } = obj;
					await api100Games.push({
						id,
						name,
						genres,
						image: background_image,
						rating,
						created: false,
					});
				});
			}
			const gamesDB = await Videogame.findAll({ include: [Genre] });
			const allDB = [];
			gamesDB.forEach(game => {
				const { id, name, Genres, image, rating, created } = game;
				allDB.push({
					id,
					name,
					genres: Genres,
					image,
					rating,
					created,
				});
			});
			const allGames = [...allDB, ...api100Games];
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
		if (id.length > 10) {
			// Antes la condición era un .includes("-")
			const gameDB = await Videogame.findOne({
				where: { id },
				include: [
					{
						model: Genre,
						attributes: ['name'],
						through: { attributes: [] },
					},
					{
						model: Platform,
						attributes: ['name'],
						through: { attributes: [] },
					},
				],
			});
			return res.json(gameDB);
		} else {
			const gameAPI = await axios.get(`${GAMES_URL}/${id}?key=${API_KEY}`);
			const {
				background_image,
				name,
				description_raw,
				released,
				rating,
				platforms,
				genres,
			} = gameAPI.data;
			const dataToRender = {
				image: background_image, // short_screenshots para un slideshow en la vista de detalles
				name,
				description: description_raw,
				released,
				rating,
				platforms,
				genres,
			};
			return res.json(dataToRender);
		}
	} catch (error) {
		return res.sendStatus(404).send({ message: 'Oops! Game not found' });
	}
};
const getGenres = async (req, res) => {
	try {
		const genre = await Genre.findAll();
		return res.json(genre);
	} catch (error) {
		return res.sendStatus(400).send({
			message: "We're sorry. There's been an error loading our genre data base",
		});
	}
};
const getPlatforms = async (req, res) => {
	try {
		const platform = await Platform.findAll();
		// console.log('ALL PLATFORMS:', platform);
		return res.json(platform);
	} catch (error) {
		return res.sendStatus(400).send({
			message:
				"We're sorry. There's been an error loading our platform data base",
		});
	}
};
const PostGame = async (req, res) => {
	const { name, description, released, rating, platforms, genres, image } =
		req.body;
	// console.log('GÉNEROS Y PLATAFORMAS: ', genres, platforms);
	// console.log('FILE TRAE: ', req.file);
	// const { image } = req.file?.path || '';
	try {
		// FALTA AGREGAR MANEJO DE COLISIONES PARA JUEGOS YA EXISTENTES
		const gameObj = {
			id: UUIDV4(),
			name,
			description,
			released,
			rating,
			image,
			created: true,
		};
		// const genresSet = new Set(genres);
		// const platformsSet = new Set(platforms);

		const gameInstance = await Videogame.create(gameObj);
		await gameInstance.addGenre(genres);
		await gameInstance.addPlatform(platforms);
		res.send({
			message: 'New game created successfully',
			data: gameInstance,
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
