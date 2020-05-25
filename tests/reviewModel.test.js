const test = require('tape');
const build = require('../database/build');

const {
	getFilmReviews,
	getUserReviews,
	postReview,
	editReview,
	deleteReview,
} = require('../model/reviewModel');

test.only('Can get reviews for one given film', (t) => {
	build()
		.then(() => {
			getFilmReviews(12).then((res) => console.log(res));
		})
		.catch((err) => console.log(err));
});
