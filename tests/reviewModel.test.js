const test = require('tape');
const build = require('../database/build');

const {
	getFilmReviews,
	getUserReviews,
	postReview,
	// editReview,
	// deleteReview,
} = require('../model/reviewModel');

// console.groupCollapsed('TEST: Can get and post reviews');

test('Can get reviews for one given film', (t) => {
	build()
		.then(() => {
			getFilmReviews('Star Wars: Episode IV - A New Hope').then((res) => {
				t.equal(res.length, 2, 'Returns two reviews');
				t.equal(res[0].movapi_id && res[1].movapi_id, 12, 'Both movAPI_id are 12');
				t.equal(res[0].user_id, 1, 'User id is correct');
				t.end();
			});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});

test('Can get reviews from one user', (t) => {
	build()
		.then(() => {
			getUserReviews(2).then((res) => {
				t.equal(res.length, 2, 'Returns two reviews from the same user');
				t.equal(res[0].user_id && res[1].user_id, 2, 'Both user_ids match');
				t.end();
			});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});

test('Can post a review', (t) => {
	const review = {
		user_id: 2,
		movAPI_id: 12,
		bechdel_1: true,
		bechdel_2: true,
		bechdel_3: true,
		beyond: 3,
		comment: 'Horrible!',
	};

	build()
		.then(() => {
			postReview(review)
				.then(() => getFilmReviews('Star Wars: Episode IV - A New Hope'))
				.then((res) => {
					t.equal(res.length, 3, 'New review added');
					t.equal(res[res.length - 1].comment, 'Horrible!', 'New comment added');
					t.end();
				});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});

// console.groupEnd('TEST: Can get and post reviews');
