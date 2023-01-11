const router = require('express').Router();
const cards_controller = require("../controllers/cards");

router.get("/", cards_controller.getCards);
router.delete("/:id", cards_controller.deleteCard);
router.post("/", cards_controller.createCard);
router.put("/:id/likes", cards_controller.likeCard);
router.delete("/:id/likes", cards_controller.dislikeCard);

module.exports = router;