const server = require("./src/app.js");
const { conn, Genre } = require("./src/db.js");
const axios = require("axios");
const { API_KEY } = process.env;
const { GENRE_URL } = require("./src/utils/urls");

// Syncing all the models at once.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    axios
      .get(`${GENRE_URL}?key=${API_KEY}`)
      .then(
        (genres) =>
          genres.data.results &&
          genres.data.results.forEach((rtdo) =>
            Genre.create({ name: rtdo.name }).catch((error) =>
              res.status(500, { message: error })
            )
          )
      );
  });
});
