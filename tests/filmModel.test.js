const test = require('tape');
const build = require('../database/build');

const { getAllFilms, getFilm } = require('../model/filmModel');

test('All films are showing in database', (t) => {
	build()
		.then(() => {
			getAllFilms().then((res) => {
				t.equal(res.length, 2, '2 movies in db');
				t.equal(res[0].title, 'Titanic', 'Titanic is first movie');
				t.equal(
					res[1].title,
					'Star Wars: Episode IV - A New Hope',
					'Star Wars is second movie',
				);
				t.end();
			});
		})
		.catch((err) => {
			t.error(err);
			t.end();
		});
});

test('Able to get a film by title', (t) => {
	build().then(() => {
		getFilm('Titanic')
			.then((res) => {
				t.equal(res.title, 'Titanic', 'Title is the same');
				t.equal(res.runtime, '194 min', 'Runtime is 194 min');
				t.equal(Object.keys(res).length, 14, 'There are 14 keys in the object');
				t.end();
			})
			.catch((err) => {
				t.error(err);
				t.end();
			});
	});
});

test('Returns an error if no film title match', (t) => {
	build().then(() => {
		getFilm('Titanik').catch((err) => {
			t.equal(err.message, 'Film does not exist', 'Correct error');
			t.equal(err.status, 404, 'Status code is 404');
			t.end();
		});
	});
});
