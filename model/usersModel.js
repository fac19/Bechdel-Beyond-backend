const db = require('../database/connection.js');

function createUser(user) {
	return db
		.query(
			'INSERT INTO users(username, email, userPassword) VALUES ($1, $2, $3)',
			[user.username, user.email, user.password],
		)
		.then((res) => res.rows[0].id);
}

module.exports = {
	createUser,
};
