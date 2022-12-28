const Card = require('../models/card');

exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send({ data: cards }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка получения карточек' }));
};

exports.createCard = (req, res) => {
  const owner = req.user._id
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка создания карточки' }));
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка при удалении карточки' }));
};

exports.likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: owner } },
  { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка поставить лайк' }));
};

exports.dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: owner } },
  { new: true },
  )
  .then(card => res.send({ data: card }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка удалить лайк' }));
};