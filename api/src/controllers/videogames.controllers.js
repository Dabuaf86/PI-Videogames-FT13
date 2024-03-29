const { Videogame, Genre, Platform } = require('../db');
const axios = require('axios').default;
const { API_KEY } = process.env;
const { GAMES_URL } = require('../utils/urls');
const { v4: UUIDV4 } = require('uuid');

// const t = await sequelize.transaction();
const included = [
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
];

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
				include: included,
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

const createGame = async (req, res) => {
	let { name, description, released, rating, platforms, genres, image } =
		req.body;
	// console.log('FILE TRAE: ', req.file);
	// const { image } = req.file?.path || '';
	description = description.charAt(0).toUpperCase() + description.slice(1);
	try {
		const gameExists = await Videogame.findOne({ where: { name } });
		if (!gameExists) {
			const gameObj = {
				id: UUIDV4(),
				name,
				description,
				released,
				rating,
				image,
				created: true,
			};
			const gameInstance = await Videogame.create(gameObj);
			await gameInstance.addGenre(genres);
			await gameInstance.addPlatform(platforms);
			res.send({
				message: 'New game created successfully',
				data: gameInstance,
			});
		} else {
			res.send({
				message: "We're, sorry. That name already exists",
			});
		}
	} catch (error) {
		return res
			.sendStatus(500)
			.send({ message: 'Oops! Something went wrong', data: error });
	}
};

const UpdateGame = async (req, res) => {
	const { id } = req.params;
	const { name, description, released, rating, platforms, genres, image } =
		req.body;
	try {
		if (id.length > 10) {
			const game = await Videogame.findOne({
				where: { id },
				include: included,
			});
			const gameWithChanges = {
				name: name || game.name,
				description: description || game.description,
				released: released || game.released,
				rating: rating || game.rating,
				image: image || game.image,
			};
			const gameExists = await Videogame.findOne({ where: { name } });
			if (!gameExists || gameExists.id === game.id) {
				game.set(gameWithChanges);
				const updatedGame = await game.save();
				genres ? await updatedGame.setGenres(genres) : null;
				platforms ? await updatedGame.setPlatforms(platforms) : null;
				res.send({
					message: 'Game updated successfully',
					data: updatedGame,
				});
			} else {
				res.send({
					message: "We're, sorry. That name already exists",
				});
			}
		}
	} catch (error) {
		return res.sendStatus(404).send({ message: 'Oops! Something went wrong.' });
	}
};

const deleteGame = async (req, res) => {
	const { id } = req.params;
	try {
		if (id.length > 10) {
			const game = await Videogame.findOne({
				where: { id },
				include: included,
			});
			await game.destroy();
			res.send({ message: 'Game deleted successfully' });
		}
	} catch (error) {
		return res.sendStatus(404).send({ message: 'Oops! Something went wrong.' });
	}
};

module.exports = {
	getGames,
	getOneGame,
	getGenres,
	getPlatforms,
	createGame,
	UpdateGame,
	deleteGame,
};
