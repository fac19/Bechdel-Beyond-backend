const express = require('express');
const cors = require('cors');
const handleError = require('./middleware/error');
const setupMovies = require('./database/fetch');

const PORT = process.env.PORT || 3000;
const { signup, logIn } = require('./handlers/usersHandlers');
const server = express();
server.use(cors());
server.use(express.json());
//server routes
server.post('/signup', signup);
server.post('/login', logIn);

server.get('/', (req, res, next) => res.send('hi'));

server.get('/search', (req, res, next) => {
	res
		.send([
			{ title: 'Starwars', poster: 'www.poster.com' },
			{ title: 'Batman', poster: 'www.poster.com' },
			{ title: 'Titanic', poster: 'www.poster.com' },
			{ title: 'IT', poster: 'www.poster.com' },
			{ title: 'other film 1', poster: 'www.poster.com' },
			{ title: 'other film 2', poster: 'www.poster.com' },
			{ title: 'other film 3', poster: 'www.poster.com' },
		])
		.catch(next);
});

// What is this for? ^

server.get('/film/:title', (req, res, next) => {
	if (req.params.title == 'titanic') {
		res
			.send({
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
			})
			.catch(next);
	}
});

server.get('/films', (req, res, next) => {
	res
		.send([
			{
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
			},

			{
				title: 'Star Wars: Episode IV - A New Hope',
				poster:
					'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
				year: '1977',
				rated: 'PG',
				released: '25 May 1977',
				runtime: '121 min',
				genre: ['Action', 'Adventure', 'Fantasy', 'Sci-Fi'],
				plot:
					"Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
				filmLanguage: 'English',
				country: 'USA',
				awards: 'Won 6 Oscars. Another 52 wins & 28 nominations.',
				ratings: [
					{ source: 'Internet Movie Database', value: '8.6/10' },
					{ source: 'Rotten Tomatoes', value: '92%' },
					{ source: 'Metacritic', value: '90/100' },
				],
			},
		])
		.catch(next);
});

server.get('/user/:id', (req, res, next) => {
	// const id = req.params.id
	//getUser(id)
	if (req.params.id === 1) {
		res.send({ id: '1', email: 'gio@gio.com', username: 'Gio' }).catch(next);
	}
});

// server.get('/', setupMovies)

server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
