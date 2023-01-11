const mongoose = require('mongoose');
const Card = require('../models/card');
const Constants = require('../utils/constants');

exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(() => {
      res
        .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
        .send({ message: Constants.SERVER_ERROR });
    });
};

exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link, owner })
    .then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        _id: card._id,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res
          .status(Constants.HTTP_BAD_REQUEST)
          .send({
            message: Constants.CARD_CREATE_BAD_DATA,
          });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      } else {
        res
          .status(Constants.HTTP_NOT_FOUND)
          .send({ message: Constants.CARD_NOT_FOUND });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(Constants.HTTP_BAD_REQUEST)
          .send({
            message: Constants.CARD_DELETE_BAD_DATA,
          });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.likeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      } else {
        res
          .status(Constants.HTTP_NOT_FOUND)
          .send({ message: Constants.CARD_NOT_FOUND });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(Constants.HTTP_BAD_REQUEST)
          .send({
            message: Constants.CARD_LIKE_BAD_DATA,
          });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};

exports.dislikeCard = (req, res) => {
  const owner = req.user._id;
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: owner } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send({
          name: card.name,
          link: card.link,
          owner: card.owner,
          _id: card._id,
        });
      } else {
        res
          .status(Constants.HTTP_NOT_FOUND)
          .send({ message: Constants.CARD_NOT_FOUND });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        res
          .status(Constants.HTTP_BAD_REQUEST)
          .send({
            message: Constants.CARD_DISLIKE_BAD_DATA,
          });
      } else {
        res
          .status(Constants.HTTP_INTERNAL_SERVER_ERROR)
          .send({ message: Constants.SERVER_ERROR });
      }
    });
};
