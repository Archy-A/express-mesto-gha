const Card = require('../models/card');
const Constants = require('../utils/constants');
const OwnerError = require('../errors/owner-err');
const NotFoundError = require('../errors/not-found-err');

exports.getCards = (req, res, next) => {
  Card.find({})
    .populate(['owner', 'likes'])
    .then((cards) => res.send(cards))
    .catch(next);
};

exports.createCard = (req, res, next) => {
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
    .catch(next);
};

exports.deleteCard = async (req, res, next) => {
  const cardb = await Card.findOne({ _id: req.params.id });
  const owner = req.user._id;
  if (cardb == null) {
    next(new NotFoundError(Constants.CARD_NOT_EXIST));
  } else if (cardb.owner.valueOf() === owner) {
    Card.findByIdAndRemove(req.params.id).then((card) => {
      res.send({
        name: card.name,
        link: card.link,
        owner: card.owner,
        _id: card._id,
      });
    });
  } else {
    next(new OwnerError(Constants.OWNER_WRONG));
  }
};

exports.likeCard = (req, res, next) => {
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
        next(new NotFoundError(Constants.CARD_NOT_FOUND));
      }
    })
    .catch(next);
};

exports.dislikeCard = (req, res, next) => {
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
        next(new NotFoundError(Constants.CARD_NOT_FOUND));
      }
    })
    .catch(next);
};
