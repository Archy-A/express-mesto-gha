const express = require('express');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');

const Constants = require('../utils/constants');

const router = express.Router();

const signup = require('./signup');

router.use('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }).unknown(true),
}), signup);

const login = require('./login');

router.use('/signin', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().min(2).pattern(Constants.REGEXPHTTP),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

const usersRouter = require('./users');

router.use('/users', usersRouter);

const cardsRouter = require('./cards');

router.use('/cards', cardsRouter);

const unexistRouter = require('./unexist');

router.use('/', unexistRouter);

router.use(errors());

router.use((err, req, res, next) => {
  console.log('error = ', err);
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

module.exports = router;
