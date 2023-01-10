const User = require('../models/user');
const Constants = require('../utils/constants');

exports.getUser = (req, res) => {
    User.findById(req.params.id.trim())
      .then((user) =>
       res.send(({
        name : user.name,
        about : user.about,
        avatar : user.avatar,
        _id : user._id,
      })))
      .catch((err) => {

        console.log('err = ', err)

        if (err.name === 'TypeError') {
          res.status(Constants.HTTP_NOT_FOUND).send({ message: 'пользователь не найден' });
        }
        else if (err.name === 'CastError') {
            res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод пользователя' });
        } else {
          res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере1111' });
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
  const { name, about, avatar } = req.body;
  const me = req.user._id.trim()
  console.log('req.body =', req.body)

  User.findByIdAndUpdate(
  me,
  { name, about, avatar },
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
    console.log('err =', err)
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
  const me = req.user._id.trim()
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    me,
  { avatar },
  {
      new: true,
      runValidators: true,
      upsert: false
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