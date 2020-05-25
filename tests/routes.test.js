const supertest = require('supertest');
const test = require('tape');
const jwt = require('jsonwebtoken');
const server = require('../server');
const build = require('../database/build');

test('Test /examples POST route with valid auth token', (t) => {
	build().then(() => {
		const token = jwt.sign(
			{
				user_id: 2,
				admin: false,
			},
			process.env.SECRET,
			{
				expiresIn: '1hr',
			},
		);
		supertest(server)
			.post('/examples')
			.set({
				Authorization: 'Bearer ' + token,
			})
			.send({
				language: 'js',
				title: 'Test Post 99',
				example: 'Test body 99',
			})
			.expect(201)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.error(err, 'HTTP status is 200 and application/json; charset=utf-8');
				t.equals(typeof res.body, typeof {}, 'Check an Object is returned');
				t.equals(typeof res.body.exampleId, typeof 1, 'Check we get an integer ID');
				t.end();
			});
	});
});
