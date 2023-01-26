const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const usersController = require('../controllers/users');

router.get('/me', usersController.getMe);
router.get('/', usersController.getUsers);
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/),
  })}),
usersController.getUser);
router.patch('/me', usersController.updateUser);
router.patch('/me/avatar', usersController.updateAvaUser);
router.patch('/:id', usersController.updateUser);

module.exports = router;
