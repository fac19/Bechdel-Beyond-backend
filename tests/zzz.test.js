// This file is to close the db after tests have ran, removes lag

const test = require('tape');
const db = require('../database/connection');

test('Close DB', (t) => {
	db.end();
	t.end();
});
