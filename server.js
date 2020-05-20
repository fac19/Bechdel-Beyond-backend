const express = require("express");
const handleError = require("./middleware/error");
const setupMovies = require('./database/fetch')

const PORT = process.env.PORT || 3000;
const { signup, logIn } = require('./handlers/usersHandlers');
const server = express();
server.use(express.json());
//server routes
server.post('/user', signup);
server.post('/login', logIn);

server.get('/', setupMovies)


server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
