const router = require('express').Router();
const users_controller = require("../controllers/users");

router.get("/users", users_controller.getUsers);
router.get("/users/:id", users_controller.getUser);
router.post("/users", users_controller.createUser);

module.exports = router;