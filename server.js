const express = require('express');
const cors = require('cors');
const handleError = require('./middleware/error');
const getUserMiddleware = require('./middleware/getUser');
const { signup, logIn } = require('./handlers/userHandler');
const { getAllFilms, getFilm } = require('./handlers/filmHandler');
const { getFilmReviews, getUserReviews, postReview } = require('./handlers/reviewHandler');
const { getFilmCrew, getFilmCast } = require('./handlers/crewHandler');

const PORT = process.env.PORT || 3001;
const server = express();
server.use(cors());
server.use(express.json());
server.use(getUserMiddleware);

// server routes
server.get('/', (req, res) => res.send(`<h1>Nothing to see here</h1>`));
// Users
server.post('/signup', signup);
server.post('/login', logIn);

// Films
server.get('/films', getAllFilms);
server.get('/film/:title', getFilm);

// Reviews
server.get('/film/:title/reviews', getFilmReviews);
server.get('/user/:id/reviews', getUserReviews);
server.post('/film/:title/reviews', postReview);

// Crew and cast data
server.get('/film/:title/crew', getFilmCrew);
server.get('/film/:title/cast', getFilmCast);

server.use(handleError);

// If this env exists we are in testing mode so don't start the server
if (process.env.PGDATABASE !== 'bbtest') {
	server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
}

module.exports = server;
