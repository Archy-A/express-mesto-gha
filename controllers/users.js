const User = require('../models/user');

exports.getUser = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.send({ data: user }))
      .catch(err => res.status(500).send({ message: 'Произошла ошибка получения пользователя' }));
};

exports.getUsers = (req, res) => {
  User.find({})
  .then(users => res.send({ data: users }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка получения пользователей' }));
};

exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка создания пользователя' }));
};

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
.then(user => res.send({ data: user }))
.catch(err => res.status(500).send({ message: 'Произошла ошибка обновления инфо' }));
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
.then(user => res.send({ data: user }))
.catch(err => res.status(500).send({ message: 'Произошла ошибка обновления аватара' }));
}