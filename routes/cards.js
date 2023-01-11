const router = require('express').Router();
const cardsController = require('../controllers/cards');

router.get('/', cardsController.getCards);
router.delete('/:id', cardsController.deleteCard);
router.post('/', cardsController.createCard);
router.put('/:id/likes', cardsController.likeCard);
router.delete('/:id/likes', cardsController.dislikeCard);

module.exports = router;
