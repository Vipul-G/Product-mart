const router = require('express').Router()
const controller = require('../controllers/order-controller')

router.get('/:user_id', controller.getOrders)

module.exports = router
