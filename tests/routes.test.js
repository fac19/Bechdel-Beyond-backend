const supertest = require('supertest');
const test = require('tape');
// const jwt = require('jsonwebtoken');
const server = require('../server');
const build = require('../database/build');

test('Route tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});

test('Test GET/film/:title route', (t) => {
	build().then(() => {
		supertest(server)
			.get('/film/Titanic')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(typeof res.body, 'object', 'Check that res.body is an object');
				t.equals(res.body.rated, 'PG-13', 'Check the rated value is the same');
				t.equals(
					res.body.plot.includes('seventeen-year-old aristocrat'),
					true,
					'Check the plot is correct',
				);
				if (err) throw err;
				t.end();
			});
	});
});

test.only('test GET/films route', (t) => {
	build().then(() => {
		supertest(server)
			.get('/films')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.length, 2, 'Films route gets two films');
				t.equals(res.body[0].title, 'titanic', 'First title is correct');
				t.equals(
					res.body[1].title,
					'Star Wars: Episode IV - A New Hope',
					'Second title is correct',
				);
				if (err) throw err;
				t.end();
			});
	});
});
