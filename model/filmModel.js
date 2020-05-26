const db = require('../database/connection.js');

function getAllFilms() {
	return db.query(`SELECT * from films`).then((result) => result.rows);
}

function getFilm(title) {
	return db.query(`SELECT * from films WHERE title=($1)`, [title]).then((result) => {
		if (result.rows.length < 1) {
			const error = new Error('Film does not exist');
			error.status = 404;
			throw error;
		}
		return result.rows[0];
	});
}

function getFilmId(title) {
	return db
		.query(`SELECT movAPI_id FROM films WHERE title=($1)`, [title])
		.then((res) => res.rows[0]);
}

module.exports = { getAllFilms, getFilm, getFilmId };
