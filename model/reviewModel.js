const db = require('../database/connection.js');

function getFilmReviews(id) {
	return db
		.query(
			`SELECT films.title,
            user_reviews.id,
            user_reviews.user_id,
            user_reviews.bechdel_1,
            user_reviews.bechdel_2,
            user_reviews.bechdel_3,
            user_reviews.beyond,
            user_reviews.comment,
            user_reviews.date,
             FROM user_reviews WHERE movAPI_id=($1) RIGHT JOIN films ON films.movAPI_id = user_reviews.movAPI_id`,
			[id],
		)
		.then((res) => res.rows);
}
function getUserReviews() {}

function postReview() {}
function editReview() {}
function deleteReview() {}

module.exports = {
	getFilmReviews,
	getUserReviews,
	postReview,
	editReview,
	deleteReview,
};
