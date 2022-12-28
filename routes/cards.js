const router = require('express').Router();
const cards_controller = require("../controllers/cards");

router.get("/cards", cards_controller.getCards);
router.delete("/cards/:id", cards_controller.deleteCard);
router.post("/cards", cards_controller.createCard);
router.put("/cards/:id/likes", cards_controller.likeCard);
router.delete("/cards/:id/likes", cards_controller.dislikeCard);

module.exports = router;