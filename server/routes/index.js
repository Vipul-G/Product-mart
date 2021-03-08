const router = require('express').Router()

router.use('/auth', require('./auth-routes'))

router.use('/product', require('./product-routes'))

router.use('/cart', require('./cart-routes'))

router.use('/payment', require('./payment-routes'))

router.use('/order', require('./order-routes'))

router.use('/user', require('./user-routes'))

module.exports = router
