const { createUser } = require('../model/usersModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const secret = process.env.SECRET;

function createUser(req, res, next) {
  if (
    req.body.email === undefined ||
    req.body.username === undefined ||
    req.body.password === undefined
  ) {
    const error = new Error(
      'Missing parameter: email, username, password all required.',
    );
    error.status = 400;
    next(error);
  }

  const newUserEmail = req.body.email;
  const newUserName = req.body.username;
  const rawPassword = req.body.password;

  bcrypt
    .genSalt(10)
    .then((salt) => bycrypt.hash(rawPassword, salt))
    .then((hashedPassword) => {
      const newUser = {
        email: newUserEmail,
        username: newUserName,
        password: hashedPassword,
      };
      createUser(newUser)
        .then((UserID) => {
          const token = jwt.sign(
            {
              user_id: UserID,
            },
            secret,
            {
              expiresIn: '15m',
            },
          );
          res.status(201).send({
            username: newUserName,
            token: token,
          });
        })
        .catch((err) => {
          res.status(401).send({
            error:
              'Could not sign up with those credentials, that email may already exist',
            msg: err.message,
          });
        });
    })
    .catch(next);
}

module.exports = {
  createUser,
};
