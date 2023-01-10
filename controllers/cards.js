const Card = require('../models/card');
const Constants = require('../utils/constants');

exports.getCards = (req, res) => {
  Card.find({})
  .then(cards => res.send(cards))
  .catch((err) => {
    res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
  })
};

exports.createCard = (req, res) => {
  const owner = req.user._id
  const { name, link } = req.body;
  Card.create({ name, link, owner })
  .then((card) => {
      res.send(({
        name : card.name,
        link : card.link,
        owner : card.owner,
        _id : card._id,
      }))
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод создания карточки' });
    } else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
  }

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
  .then((card) => {
    if (card) {
      res.send(({
        name : card.name,
        link : card.link,
        owner : card.owner,
        _id : card._id,
      }))
    } else {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'карточка не найдена' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод удаления карточки' });
    }
    else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
  }


exports.likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
  req.params.id,
  { $addToSet: { likes: owner } },
  { new: true },
  )
  .then((card) => {
    if (card) {
      res.send(({
        name : card.name,
        link : card.link,
        owner : card.owner,
        _id : card._id,
       }))
    } else {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'карточка не найдена' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод лайка карточки' });
    }
    else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
  }

exports.dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
  req.params.id,
  { $pull: { likes: owner } },
  { new: true },
  )
  .then((card) => {
    if (card) {
      res.send(({
        name : card.name,
        link : card.link,
        owner : card.owner,
        _id : card._id,
      }))
    } else {
      res.status(Constants.HTTP_NOT_FOUND).send({ message: 'карточка не найдена' });
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(Constants.HTTP_BAD_REQUEST).send({ message: 'переданы некорректные данные в метод дизлайка карточки' });
    } else {
      res.status(Constants.HTTP_INTERNAL_SERVER_ERROR).send({ message: 'произошла ошибка на сервере' });
    }
    });
  }