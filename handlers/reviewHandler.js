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
	const userId = req.params.id;
	model
		.getUserReviews(userId)
		.then((reviews) => res.status(200).send(reviews))
		.catch(next);
}

function postReview(req, res, next) {
	// const reviewBody = req.body;
	model
		.getFilmId(req.params.title)
		.then((filmId) => {
			const userId = req.user.user_id;
			const reviewHeader = {
				user_id: userId,
				movAPI_id: filmId.movapi_id,
			};

			const reviewBody = { ...reviewHeader, ...req.body };
			model.postReview(reviewBody).then((review) => {
				res.status(201).send(review);
			});
		})
		.catch(next);
}

module.exports = { getFilmReviews, getUserReviews, postReview };
