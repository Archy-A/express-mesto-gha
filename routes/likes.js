const router = require('express').Router();
const cardsController = require('../controllers/cards');

router.put('/', cardsController.likeCard);
router.delete('/', cardsController.dislikeCard);

module.exports = router;
