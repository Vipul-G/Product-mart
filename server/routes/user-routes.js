const router = require('express').Router();
const controller = require('../controllers/user-controller')

// @route: localhost:3000/api/user

router.get('', controller.getUsers)

router.delete('/:user_id', controller.deleteUser)

module.exports = router;
