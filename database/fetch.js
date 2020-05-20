const db = require('./connection');
const fetch = require('node-fetch');

const apikeyTMDB = process.env.APIKEYTMDB;
const apikeyOMDB = process.env.APIKEYOMDB;

const movieTitles = [];
const movieIds = [];
// console.log("movieIds", movieIds)

function checkResponse(res) {
	if (!res.ok) {
		const error = new Error(`Movie doesn't exist in OMDb`);
		error.status = res.status;
		throw error;
	} else {
		return res.json();
	}
}

function setupMovies() {
	let i = 0;
	return (
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=${apikeyTMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=1997`,
		)
			.then((data) => data.json())
			.then((result) => {
				const moviesArr = result.results;
				if (i <= 20) {
					moviesArr.map((movie) => {
						movieTitles.push(movie.title);
						movieIds.push(movie.id);
						i++;
					});
				}
				return movieTitles;
			})
			// .then(getMovieDetails)
			.then(getMovieCrew)
			.catch(console.error)
	);

	// console.log('titles', movieTitles, 'movieIds', movieIds);
}

function getMovieDetails() {
	movieIds.forEach((id) => {
		return fetch('http://www.omdbapi.com/?t=' + title + '&apikey=' + apikeyOMDB)
			.then(checkResponse)
			.then((movie) => {
				return db
					.query(
						`INSERT INTO films(title, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12 ) RETURNING *`,
						[
							movie.Title,
							movie.Poster,
							movie.Year,
							movie.Rated,
							movie.Released,
							movie.Runtime,
							movie.Genre,
							movie.Plot,
							movie.Language,
							movie.Country,
							movie.Awards,
							movie.Metascore,
						],
					)
					.then((res) => console.log(res.rows[0]));
			})
			.catch(console.error);
	});
}

function getMovieCrew() {
	let i = 0;
	movieIds.forEach((id) => {
		return fetch(
			'https://api.themoviedb.org/3/movie/' +
				id +
				'/credits?api_key=' +
				apikeyTMDB,
		)
			.then(checkResponse)
			.then((movieCrew) => {
				console.log(movieCrew.id, movieTitles[i]);
				i++;
			});
		// .then((results) => console.log(results));
	});
}

module.exports = setupMovies;
