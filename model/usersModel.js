const db = require('../database/connection.js');

function createUser(user) {
  return db
    .query(
      'INSERT INTO users(username, email, userPassword) VALUES ($1, $2, $3) RETURNING id;',
      [user.username, user.email, user.password],
    )
    .then((results) => results.rows[0].id);
}

function getUser(email) {
  return db
    .query('SELECT * FROM users WHERE email = ($1);', [email])
    .then((res) => {
      if (res.rows.length < 1) throw new Error('User does not exist');
      return res.rows[0];
    });
}

module.exports = {
  createUser,
  getUser,
};
