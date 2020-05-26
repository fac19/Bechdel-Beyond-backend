const supertest = require('supertest');
const test = require('tape');
const jwt = require('jsonwebtoken');
const server = require('../server');
const build = require('../database/build');

require('dotenv').config();

test('Route tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});

test('Test GET/film/:title/crew', (t) => {
	build().then(() => {
		supertest(server)
			.get('/film/titanic/crew')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.movapi_id, 34, 'Request responses with correct movie id');
				t.equals(res.body.director, 'James', 'Request responses with correct movie director');
				if (err) throw err;
				t.end();
			});
	});
});
test('Test GET/film/:title/cast', (t) => {
	build().then(() => {
		supertest(server)
			.get('/film/titanic/cast')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.movapi_id, 34, 'Request responses with correct movie id');
				t.equal(res.body.gender_parity_cast.female, 33, 'female gender parity is correct');
				if (err) throw err;
				t.end();
			});
	});
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

test('test GET/films route', (t) => {
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

test('test GET/film/:title/reviews route', (t) => {
	build().then(() => {
		supertest(server)
			.get('/film/titanic/reviews')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.length, 2, 'Get reviews for Titanic');
				t.equals(Object.keys(res.body[0]).length, 10, 'Review object has 10 keys');
				t.equals(res.body[0].title, 'titanic', 'Film title is correct');
				t.equals(res.body[0].comment, 'It was terrible!', 'Review coment match');
				if (err) throw err;
				t.end();
			});
	});
});

test('test GET/user/:id/reviews route', (t) => {
	build().then(() => {
		supertest(server)
			.get('/user/3/reviews')
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.length, 1, 'Get all user reviews');
				t.equals(Object.keys(res.body[0]).length, 10, 'Review object has 10 keys');
				t.equals(res.body[0].comment, 'terrible!', 'Review comment match');
				if (err) throw err;
				t.end();
			});
	});
});

test('test POST /signup route', (t) => {
	build().then(() => {
		supertest(server)
			.post('/signup')
			.send({
				email: 'harry@harry.com',
				username: 'Harry',
				password: '123',
			})
			.expect(201)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.notEquals(res.body.token, undefined, 'A token has been issued');
				t.equals(
					/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(res.body.token),
					true,
					'Check for correct jwt token',
				);
				t.equals(res.body.email, 'harry@harry.com', 'Email is correct');
				if (err) throw err;
				t.end();
			});
	});
});

test('Test POST /login route', (t) => {
	build().then(() => {
		supertest(server)
			.post('/login')
			.send({
				email: 'guy@someguy.com',
				password: '123',
			})
			.expect(200)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.user_name, 'Guy', 'Username is correct');
				t.notEquals(res.body.token, undefined, 'A token has been issued');
				t.equals(
					/^[a-zA-Z0-9\-_]+?\.[a-zA-Z0-9\-_]+?\.([a-zA-Z0-9\-_]+)?$/.test(res.body.token),
					true,
					'Check for correct jwt token',
				);
				if (err) throw err;
				t.end();
			});
	});
});

test('Test POST /film/:title/reviews', (t) => {
	const token = jwt.sign({ user_id: 3 }, process.env.SECRET, {
		expiresIn: '1h',
	});
	const review = {
		bechdel_1: true,
		bechdel_2: true,
		bechdel_3: true,
		beyond: 3,
		comment: 'Horrible!',
	};
	build().then(() => {
		supertest(server)
			.post('/film/titanic/reviews')
			.set({ Authorization: `Bearer ${token}` })
			.send(review)
			.expect(201)
			.expect('content-type', 'application/json; charset=utf-8')
			.end((err, res) => {
				t.equals(res.body.user_id, 3, 'user ID is correct');
				t.equals(res.body.movapi_id, 34, 'correct film id was added to Db');
				if (err) throw err;
				t.end();
			});
	});
});

test('Test POST /film/:title/reviews - User cannot post if they are not signed in', (t) => {
	const review = {
		bechdel_1: true,
		bechdel_2: true,
		bechdel_3: true,
		beyond: 3,
		comment: 'Horrible!',
	};
	build().then(() => {
		supertest(server)
			.post('/film/titanic/reviews')
			.send(review)
			.expect(401)
			.end((err, res) => {
				t.equals(res.text, 'Please login', 'Error message is Please login');
				t.equal(res.status, 401, 'Status code is 401');
				t.end();
			});
	});
});
