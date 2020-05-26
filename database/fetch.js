const fetch = require('node-fetch');

const db = require('./connection');

const apikeyTMDB = process.env.APIKEYTMDB;
const apikeyOMDB = process.env.APIKEYOMDB;

const movieTitles = [];
const movieIds = [];


function checkResponse(res) {
	if (!res.ok) {
		const error = new Error(`Movie doesn't exist in OMDb`);
		error.status = res.status;
		throw error;
	} else {
		return res.json();
	}
}

function getMovieDetails() {
	movieTitles.forEach(({ title, id, imdbid }) => {
		fetch(`http://www.omdbapi.com/?t=${title}&apikey=${apikeyOMDB}`)
			.then(checkResponse)
			.then((movie) => {
				const movieTitle = movie.Title.toLowerCase();
				return db
					.query(
						`INSERT INTO films(title, movAPI_id, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
						[
							movieTitle,
							id,
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
					.then((res) => res.rows[0]);
			})
			.catch(console.error);
		//is title in bedchel api? then insert bechdel info in to reviews
		fetch(`http://bechdeltest.com/api/v1/getMovieByImdbId?imdbid=${imdbid}`)
			.then((response) => response.json())
			.then((movie) => {
				let b1 = false;
				let b2 = false;
				let b3 = false;
				let bey = 0;
				// console.log(movie.rating, typeof movie.rating);
				if (movie.rating === 3) {
					b1 = true;
					b2 = true;
					b3 = true;
					bey = 4;
				} else if (movie.rating === 2) {
					b1 = true;
					b2 = true;
					bey = 3;
				} else {
					b1 = true;
					bey = 2;
				}
				return db.query(
					`INSERT INTO user_reviews(user_id, movAPI_id, bechdel_1, bechdel_2, bechdel_3, beyond, comment) VALUES($1, $2, $3, $4, $5, $6, $7)`,
					[0, id, b1, b2, b3, bey, 'Added by Bechdel Api'],
				);
			})
			.catch(console.error);
	});
}

function getMovieCrew() {
	movieIds.forEach((id) => {
		return fetch(
			`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apikeyTMDB}`,
		)
			.then(checkResponse)
			.then((movieCrew) => {
				let males = 0;
				let females = 0;
				let undefinds = 0;
				let director = '';
				let assistantDirector = '';
				let producer = '';
				movieCrew.crew.map((a) => {
					if (a.job === 'Director') director = a.name;
					if (a.job === 'Assistant_Director') assistantDirector = a.name;
					if (a.job === 'Producer') producer = a.name;
					if (a.gender === 1) {
						females++;
					} else if (a.gender === 2) {
						males++;
					} else {
						undefinds++;
					}
				});
				movieCrew.cast.map((a) => {
					return db
						.query(
							`INSERT INTO film_cast(name, gender, character, movAPI_id) VALUES ($1, $2, $3, $4) RETURNING id`,
							[a.name, a.gender, a.character, id],
						)
						.then((res) => res.rows[0]);
					// console.log(a.name, a.character, a.gender, id),
				});

				return db
					.query(
						`INSERT INTO films_crew(director, assistant_director, producer,gender_parity, movAPI_id) VALUES ($1, $2, $3, $4, $5) RETURNING id`,
						[
							director,
							assistantDirector,
							producer,
							{ male: males, female: females, notlisted: undefinds },
							id,
						],
					)
					.then((res) => res.rows[0]);
			});
	});
}

function setupMovies() {
  let i = 0;
	return fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${apikeyTMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=1997`,
	)
		.then((data) => data.json())
		.then((result) => {
      const moviesArr = result.results;
			if (i <= 20) {
				moviesArr.map((movie) => {
					fetch(
						`https://api.themoviedb.org/3/movie/${movie.id}/external_ids?api_key=${apikeyTMDB}`,
					)
						.then((data) => data.json())
						.then((response) => {
							let imdb = response.imdb_id.replace('tt', '');
							movieTitles.push({
								title: movie.title,
								id: movie.id,
								imdbid: imdb,
							});
							movieIds.push(movie.id);
							i++;
						});
				});
			}
			return movieTitles;
		})
		.then(getMovieDetails)
		.then(getMovieCrew)
		.catch(console.error);
}
setupMovies()
module.exports = setupMovies;
