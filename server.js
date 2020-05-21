const express = require('express');
const handleError = require('./middleware/error');
const setupMovies = require('./database/fetch');

const PORT = process.env.PORT || 3000;
const { signup, logIn } = require('./handlers/usersHandlers');
const server = express();
server.use(express.json());
//server routes
server.post('/user', signup);
server.post('/login', logIn);

server.get('/', (req, res, next) => res.send('hi'));

server.get('/search', (req, res, next) => {
  res.send([
    { title: 'Starwars', poster: 'www.poster.com' },
    { title: 'Batman', poster: 'www.poster.com' },
    { title: 'Titanic', poster: 'www.poster.com' },
    { title: 'IT', poster: 'www.poster.com' },
    { title: 'other film 1', poster: 'www.poster.com' },
    { title: 'other film 2', poster: 'www.poster.com' },
    { title: 'other film 3', poster: 'www.poster.com' },
  ]);
});

server.get('/film/:title', (req, res, next) => {
  if (req.params.title == 'titanic') {
    res.send({
      title: 'Titanic',
      poster:
        'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUCotMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg',
      year: '1997',
      rated: 'PG-13',
      released: '19 Dec 1997',
      runtime: '194 min',
      genre: ['drama', 'romance'],
      plot:
        'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
      filmLanguage: 'English',
      country: 'USA',
      awards: 'Won 11 oscars and another 114 wins',
      ratings: [
        { Source: 'Internet Movie Database', Value: '7.8/10' },
        { Source: 'Rotten Tomatoes', Value: '82%' },
        { Source: 'Metacritic', Value: '83/100' },
      ],
    });
  }
});

// server.get('/', setupMovies)

server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
