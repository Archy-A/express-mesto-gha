const mongoose = require('mongoose');
const User = require('../models/user');
const Constants = require('../utils/constants');

exports.getUser = (req, res) => {
  User.findById(req.params.id.trim())
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
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res.status(Constants.HTTP_BAD_REQUEST).send({
          message: Constants.USER_BAD_DATA,
        });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res
        .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: Constants.SERVER_ERROR });
    });
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      _id: user._id,
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(Constants.HTTP_BAD_REQUEST).send({
          message: Constants.USER_CREATE_BAD_DATA,
        });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const me = req.user._id.trim();
  User.findByIdAndUpdate(
    me,
    { name, about, avatar },
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
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(Constants.HTTP_BAD_REQUEST).send({
          message: Constants.USER_UPDATE_BAD_DATA,
        });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.updateAvaUser = (req, res) => {
  const me = req.user._id.trim();
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
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(Constants.HTTP_BAD_REQUEST).send({
          message: Constants.USER_AVA_BAD_DATA,
        });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};
