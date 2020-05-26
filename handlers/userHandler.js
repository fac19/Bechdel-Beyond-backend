const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const model = require('../model/userModel');

require('dotenv').config();

const secret = process.env.SECRET;

function signup(req, res, next) {
	if (!req.body.email || !req.body.username || !req.body.password) {
		return res.status(400).send({ message: 'req body cannot be empty' });
	}
	const newUserEmail = req.body.email;
	const newUserName = req.body.username;
	const rawPassword = req.body.password;
	return bcrypt
		.genSalt(10)
		.then((salt) => bcrypt.hash(rawPassword, salt))
		.then((cookedPassword) => {
			const newUser = {
				username: newUserName,
				email: newUserEmail,
				password: cookedPassword,
			};
			model
				.createUser(newUser)
				.then((userID) => {
					const token = jwt.sign({ user_id: userID }, secret, {
						expiresIn: '1h',
					});
					res.status(201).send({
						user_id: userID,
						username: newUserName,
						email: newUserEmail,
						token,
					});
				})
				.catch((err) => {
					res.status(401).send({
						error: 'Could not sign up with those credentials, that email may already exist',
						msg: err.message,
					});
				})
				.catch(next);
		});
}

function logIn(req, res, next) {
	model
		.getUser(req.body.email)
		.then((dbUser) => {
			return bcrypt.compare(req.body.password, dbUser.userpassword).then((result) => {
				if (!result) throw new Error('Bad password!');
				return dbUser;
			});
		})
		.then((dbUser) => {
			const claims = {
				user_id: dbUser.id,
				admin: dbUser.adminusr || false,
			};
			const token = jwt.sign(claims, secret, {
				expiresIn: '24h',
			});
			res.send({
				user_name: dbUser.username,
				user_id: dbUser.id,
				token,
			});
		})
		.catch(next);
}

module.exports = {
	signup,
	logIn,
};
