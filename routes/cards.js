const router = require('express').Router();
const cards_controller = require("../controllers/cards");

router.get("/cards", cards_controller.getCards);
router.delete("/cards/:id", cards_controller.deleteCard);
router.post("/cards", cards_controller.createCard);

module.exports = router;