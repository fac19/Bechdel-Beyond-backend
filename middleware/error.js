// eslint-disable-next-line no-unused-vars
function handleError(err, req, res, next) {
	const errorStatus = err.status || 400;
	res.status(errorStatus).send({ error: err.message });
}

module.exports = handleError;
