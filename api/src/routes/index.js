const { Router } = require("express");

const {
  getGames,
  getOneGame,
  getGenres,
  getPlatforms,
  PostGame,
} = require("../controllers/videogames.controllers");

const router = Router();

router.get("/videogames", getGames);
router.get("/videogame/:id", getOneGame);
router.post("/videogame", PostGame);
router.get("/genres", getGenres);
router.get("/platforms", getPlatforms);

module.exports = router;
