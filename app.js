const express = require('express');
const mongoose = require('mongoose');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/mestodb');

const signup = require('./routes/signup');
app.use('/signup', signup);

const login = require('./routes/login');
app.use('/signin', login);

app.use(auth);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const meRouter = require('./routes/me');
app.use('/me', meRouter);

const cardsRouter = require('./routes/cards');
app.use('/cards', cardsRouter);

const unexistRouter = require('./routes/unexist');
app.use('/', unexistRouter);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла какая-то ошибка, нипанятнааа..'
        : message,
    });
});

app.listen(PORT, () => {
  console.log('--------------------------');
  console.log('                          ');
  console.log('SERVER HAS BEEN STARTED!!!');
  console.log('                          ');
  console.log('--------------------------');
});
