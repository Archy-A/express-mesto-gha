const router = require('express').Router();
const users_controller = require("../controllers/users");

router.get("/", users_controller.getUsers);
router.get("/:id", users_controller.getUser);
router.post("/", users_controller.createUser);
router.patch("/me", users_controller.updateUser);
router.patch("/me/avatar", users_controller.updateAvaUser);
router.patch("/:id", users_controller.updateUser);

module.exports = router;