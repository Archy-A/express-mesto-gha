const router = require('express').Router();
const unexist_controller = require("../controllers/unexist");

router.get("/*", unexist_controller.processUnexist);
router.post("/*", unexist_controller.processUnexist);
router.patch("/*", unexist_controller.processUnexist);
router.put("/*", unexist_controller.processUnexist);
router.delete("/*", unexist_controller.processUnexist);

module.exports = router;