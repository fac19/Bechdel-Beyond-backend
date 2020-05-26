// const supertest = require('supertest');
const test = require('tape');
// const jwt = require('jsonwebtoken');
// const server = require('../server');
// const build = require('../database/build');
// const {getUser} = require ('../middleware/getUser');

require('dotenv').config();

test('Route tests are running!', (t) => {
	const x = 5;
	t.equal(x, 5, 'this is working');
	t.end();
});
