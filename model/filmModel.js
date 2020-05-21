const db = require('../database/connection.js');

function getAllFilms() {
	return db.query(`SELECT * from films`).then((result) => result.rows);
}

function getFilm(title) {
	console.log(title);
	return db
		.query(`SELECT * from films WHERE title=($1)`, [title])
		.then((result) => result.rows[0]);
}

module.exports = { getAllFilms, getFilm };
