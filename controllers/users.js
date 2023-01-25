const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Constants = require('../utils/constants');

const NotFoundError = require('../errors/not-found-err');

exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else {
        throw new NotFoundError(Constants.USER_NOT_FOUND);
      }
    })
    .catch(next);
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else {
        throw new NotFoundError(Constants.USER_NOT_FOUND);
      }
    })
    .catch(next);
};

exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

exports.createUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) return res.status(409).send({ message: 'Уже есть такой пользователь!' });
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hash,
    })
      .then((userdata) => res.send({
        name: userdata.name,
        about: userdata.about,
        avatar: userdata.avatar,
        email: userdata.email,
        _id: userdata._id,
      }))
      .catch(next));
  return null;
};

exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  const me = req.user._id;
  User.findByIdAndUpdate(
    me,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else {
        res
          .status(Constants.HTTP_NOT_FOUND)
          .send({ message: Constants.USER_NOT_FOUND });
      }
    })
    .catch(next);
};

exports.updateAvaUser = (req, res, next) => {
  const me = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      if (user) {
        res.send({
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          _id: user._id,
        });
      } else {
        res
          .status(Constants.HTTP_NOT_FOUND)
          .send({ message: Constants.USER_NOT_FOUND });
      }
    })
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, 'super-strong-secret', {
        expiresIn: '7d',
      });
      res.send({ token });
    })
    .catch(next);
};
