const db = require('../database/connection');

function getCrew(filmId) {
	return db.query(`SELECT * from films_crew WHERE movAPI_id=($1)`, [filmId]).then((result) => {
		if (result.rows.length < 1) {
			const error = new Error('Film does not exist in our database');
			error.status = 404;
			throw error;
		}
		return result.rows[0];
	});
}

function getCast(filmId) {
	return db.query(`SELECT * from film_cast WHERE movAPI_id=($1)`, [filmId]).then((result) => {
		if (result.rows.length < 1) {
			const error = new Error('Film does not exist in our database');
			error.status = 404;
			throw error;
		}
		return result.rows[0];
	});
}

module.exports = {
	getCast,
	getCrew,
};
