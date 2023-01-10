const User = require('../models/user');
const Constants = require('../utils/constants');

exports.getUser = (req, res) => {
    User.findById(req.params.id)
      .then((user) =>
       res.send(({
        name : user.name,
        about : user.about,
        avatar : user.avatar,
        _id : user._id,
      })))
      .catch((err) => {
        if (err.name === 'CastError') {
          console.log(Constants.HTTP_NOT_FOUND)
          res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
        } else {
          res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
        }
      });
}

exports.getUsers = (req, res) => {
  User.find({})
  .then((users) => {
    res.send(users)
})
.catch((err) => {
    res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
})
}

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then((user) =>
    res.send(({
      name : user.name,
      about : user.about,
      avatar : user.avatar,
      _id : user._id,
    })))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод создания пользователя' });
    } else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
  }

exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
  req.params.id,
  { name, about },
  {
      new: true,
      runValidators: true,
      upsert: true
  }
  )
  .then((user) => {
    if (user) {
      res.send(({
        name : user.name,
        about : user.about,
        avatar : user.avatar,
        _id : user._id,
      }))
    } else {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
    }
      else if (err.name === 'ValidationError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод обновления профиля' });
    } else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
}

exports.updateAvaUser = (req, res) => {
  const me = req.user._id
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
  { avatar },
  {
      new: true,
      runValidators: true,
      upsert: true
  }
  )
  .then((user) => {
    if (user) {
      res.send(({
        name : user.name,
        about : user.about,
        avatar : user.avatar,
        _id : user._id,
      }))
    } else {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
    }
      else if (err.name === 'ValidationError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод обновления аватара пользователя' });
    } else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
}