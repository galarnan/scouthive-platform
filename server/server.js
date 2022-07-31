/* eslint-disable consistent-return */
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const routes = require('./controllers/routes');

const app = express();

app.use(express.json());
app.use(cors());

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: '1997',
    database: 'scouthive',
  },
});

function authenticateToken(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.json(false);
    }
    req.user = user;
    next();
  });
}

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });
app.post('/signin', signin.handleSignin(db, bcrypt));

app.use('/api', authenticateToken, routes);

app.listen(3000, () => {
  console.log('application is running on port 3000');
});
