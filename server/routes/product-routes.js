const router = require('express').Router();
const controller = require('../controllers/product-controller')
const extractFile = require('../middlewares/multer')

// @route: localhost:3000/api/product

router.post('', extractFile, controller.addProduct)
router.get('', controller.getProducts)
router.put('', extractFile, controller.updateProduct)
router.delete('/:id', controller.deleteProduct)

module.exports = router;
