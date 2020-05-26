const model = require('../model/crewModel');
const { getFilmId } = require('../model/filmModel');

function getFilmCrew(req, res, next) {
	const filmTitle = req.params.title;
	getFilmId(filmTitle)
		.then((filmId) => {
			model
				.getCrew(filmId.movapi_id)
				.then((result) => res.status(200).send(result))
				.catch(next);
		})
		.catch(next);
}

function getFilmCast(req, res, next) {
	const filmTitle = req.params.title;
	getFilmId(filmTitle)
		.then((filmId) => {
			model
				.getCast(filmId.movapi_id)
				.then((result) => res.status(200).send(result))
				.catch(next);
		})
		.catch(next);
}

module.exports = {
	getFilmCrew,
	getFilmCast,
};
