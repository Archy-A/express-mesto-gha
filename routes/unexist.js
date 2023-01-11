const router = require('express').Router();
const unexist_controller = require("../controllers/unexist");

router.all("/*", unexist_controller.processUnexist);

module.exports = router;