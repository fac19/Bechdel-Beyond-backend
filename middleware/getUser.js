const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const secret = process.env.SECRET;

function extractToken(req) {
	if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
		return req.headers.authorization.split(' ')[1];
	}
	if (req.query && req.query.token) {
		return req.query.token;
	}
	return null;
}

// TODO - Test this!

function getUser(req, res, next) {
	const token = extractToken(req);
	if (token) {
		const user = jwt.verify(token, secret);
		req.user = user;
	}
	next();
}

module.exports = getUser;
