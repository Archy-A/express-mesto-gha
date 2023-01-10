const router = require('express').Router();
const users_controller = require("../controllers/users");

router.get("/users", users_controller.getUsers);
router.get("/users/:id", users_controller.getUser);
router.post("/users", users_controller.createUser);
router.patch("/users/me", users_controller.updateUser);
router.patch("/users/me/avatar", users_controller.updateAvaUser);
router.patch("/users/:id", users_controller.updateUser);

module.exports = router;