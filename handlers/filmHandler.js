const model = require('../model/filmModel');

function getAllFilms(req, res, next) {
	model
		.getAllFilms()
		.then((films) => console.log(films))
		.catch(next);
}

function getFilm(req, res, next) {
	const title = req.params.title;
	model
		.getFilm(title)
		.then((film) => res.status(200).send(film))
		.catch(next);
}

module.exports = { getAllFilms, getFilm };
