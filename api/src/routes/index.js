const { Router } = require("express");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const {
  getGames,
  getOneGame,
  getGenres,
  PostGame,
} = require("../controllers/videogames.controllers");

const router = Router();

router.get("/videogames", getGames);
router.get("/videogame/:id", getOneGame);
router.post("/videogame", PostGame);
router.get("/genres", getGenres);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
