const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middlewares/auth');
const Constants = require('./utils/constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1/mestodb');

const signup = require('./routes/signup');

app.use('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }).unknown(true),
}), signup);

const login = require('./routes/login');

app.use('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8).max(30),
  }),
}), login);

app.use(auth);
const usersRouter = require('./routes/users');

app.use(
  '/users',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
      email: Joi.string().email(),
      password: Joi.string().min(8).max(30),
    }),
  }),
  usersRouter,
);

const cardsRouter = require('./routes/cards');

app.use(
  '/cards',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      link: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    }),
  }),
  cardsRouter,
);

const unexistRouter = require('./routes/unexist');

app.use('/', unexistRouter);

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла какая-то ошибка, ...........................'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log('--------------------------');
  console.log('                          ');
  console.log('SERVER HAS BEEN STARTED!!!');
  console.log('                          ');
  console.log('--------------------------');
});
