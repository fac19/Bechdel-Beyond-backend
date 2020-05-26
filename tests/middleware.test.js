const supertest = require('supertest');
const test = require('tape');
// const jwt = require('jsonwebtoken');
const server = require('../server');
const build = require('../database/build');

require('dotenv').config();

test('Route tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});

test('handleError function returns ccustom message', (t) => {
	build().then(() => {
		supertest(server)
			.get('/film/dummy')
			.expect(404)
			.expect('content-type', 'application/json')
			.end((err, res) => {
				t.equals(res.body.error, 'Film does not exist in our database', 'custom error returned');
				t.end();
			});
	});
});
