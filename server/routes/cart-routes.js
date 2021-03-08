const router = require('express').Router()
const controller = require('../controllers/cart-controller')

router.post('', controller.addToCart)
router.get('/:user_id/:product_id', controller.getCartItems)
router.put('/count/:user_id/:product_id', controller.updateCount)
router.delete('/:user_id/:product_id', controller.removeProduct)



module.exports = router
