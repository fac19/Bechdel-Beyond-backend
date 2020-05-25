const express = require('express');
const cors = require('cors');
const handleError = require('./middleware/error');
const setupMovies = require('./database/fetch');
const { signup, logIn } = require('./handlers/userHandler');
const { getAllFilms, getFilm } = require('./handlers/filmHandler');

const PORT = process.env.PORT || 3000;
const server = express();
server.use(cors());
server.use(express.json());

//server routes
// server.get('/', setupMovies);
server.post('/signup', signup);
server.post('/login', logIn);

server.get('/films', getAllFilms);

server.get('/film/:title', getFilm);
server.post('/film/:title/reviews', postReview);

// server.get('/user/:id', )

server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
