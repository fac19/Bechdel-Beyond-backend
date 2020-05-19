const express = require('express');
const handleError = require('./middleware/error');
const users = require('./handlers/usersHandlers');

const PORT = process.env.PORT || 3000;

const server = express();
server.use(express.json());

//server routes
server.post('/user', users.createUser);
server.use(handleError);

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
