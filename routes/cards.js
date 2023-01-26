const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const cardsController = require('../controllers/cards');
const Constants = require('../utils/constants');

router.get('/', cardsController.getCards);
router.delete('/:id', cardsController.deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().min(2).pattern(Constants.REGEXPHTTP),
  })}), cardsController.createCard);

router.put('/:id/likes', cardsController.likeCard);
router.delete('/:id/likes', cardsController.dislikeCard);

module.exports = router;
