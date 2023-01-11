const router = require('express').Router();
const usersController = require('../controllers/users');

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateAvaUser);
router.patch('/:id', usersController.updateUser);

module.exports = router;
