const express = require('express');
const cors = require('cors');
const handleError = require('./middleware/error');
// const setupMovies = require('./database/fetch');
const { signup, logIn } = require('./handlers/userHandler');
const { getAllFilms, getFilm } = require('./handlers/filmHandler');
const { getFilmReviews, getUserReviews } = require('./handlers/reviewHandler');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());
server.use(express.json());

// server routes

// server.get('/', setupMovies);

// Users
server.post('/signup', signup);
server.post('/login', logIn);

// Films
server.get('/films', getAllFilms);
server.get('/film/:title', getFilm);

// Reviews
server.get('/film/:title/reviews', getFilmReviews);
server.get('/user/:id/reviews', getUserReviews);
// server.post('/film/:title/reviews', postReview);

// Stretch goals
// server.put('/user/:id/reviews/:id', editReview);
// server.delete('/user/:id/reviews/:id', deleteReview);

server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

module.exports = server;
