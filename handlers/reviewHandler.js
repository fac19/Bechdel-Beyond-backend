const model = require('../model/reviewModel');

// bechdel rate to return boolean

function getFilmReviews(req, res, next) {
	const filmTitle = req.params.title;
	model
		.getFilmReviews(filmTitle)
		.then((films) => res.status(200).send(films))
		.catch(next);
}
function getUserReviews(req, res, next) {
	const userId = req.user.id;
	model
		.getUserReviews(userId)
		.then((reviews) => res.status(200).send(reviews))
		.catch(next);
}

// function postReview(req, res, next) {}
// function editReview(req, res, next) {}
// function deleteReview(req, res, next) {}

module.exports = { getFilmReviews, getUserReviews };
