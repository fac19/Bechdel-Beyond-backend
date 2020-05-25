const db = require('../database/connection.js');

function getFilmReviews(title) {
	return db
		.query(
			`SELECT films.title,
            user_reviews.id,
            user_reviews.movAPI_id,
            user_reviews.user_id,
            user_reviews.bechdel_1,
            user_reviews.bechdel_2,
            user_reviews.bechdel_3,
            user_reviews.beyond,
            user_reviews.comment,
            user_reviews.date
             FROM user_reviews RIGHT JOIN films ON films.movAPI_id = user_reviews.movAPI_id WHERE films.title=($1)`,
			[title],
		)
		.then((res) => res.rows);
}
function getUserReviews(id) {
	return db
		.query(
			`SELECT 
      users.username, 
      user_reviews.id, 
      user_reviews.movAPI_id, 
      user_reviews.user_id, 
      user_reviews.bechdel_1, 
      user_reviews.bechdel_2, 
      user_reviews.bechdel_3, 
      user_reviews.beyond, 
      user_reviews.comment, 
      user_reviews.date
      FROM user_reviews RIGHT JOIN users ON users.id = user_reviews.user_id WHERE user_id=($1)`,
			[id],
		)
		.then((res) => res.rows);
}

function postReview(review) {
	return db.query(
		`INSERT INTO user_reviews
        (user_id, movAPI_id, bechdel_1, bechdel_2, bechdel_3, beyond, comment) VALUES($1, $2, $3, $4, $5, $6, $7)`,
		[
			review.user_id,
			review.movAPI_id,
			review.bechdel_1,
			review.bechdel_2,
			review.bechdel_3,
			review.beyond,
			review.comment,
		],
	);
}

// Stretch goals
// function editReview() {}
// function deleteReview() {}

module.exports = {
	getFilmReviews,
	getUserReviews,
	postReview,
	// editReview,
	// deleteReview,
};
