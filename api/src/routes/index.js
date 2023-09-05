const { Router } = require('express');

const {
	getGames,
	getOneGame,
	getGenres,
	getPlatforms,
	createGame,
	UpdateGame,
	deleteGame,
} = require('../controllers/videogames.controllers');

const router = Router();

router.get('/videogames', getGames);
router.get('/videogame/:id', getOneGame);
router.post('/videogame', createGame);
router.put('/videogame/:id', UpdateGame);
router.delete('/videogame/:id', deleteGame);
router.get('/genres', getGenres);
router.get('/platforms', getPlatforms);

module.exports = router;
