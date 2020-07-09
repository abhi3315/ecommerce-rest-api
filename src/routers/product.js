const express = require('express')
const productController = require('../controllers/product')
const providerAuth = require('../middlewares/providerAuth')
const router = express.Router()

router.post('/provider/products', providerAuth, productController.addProduct)

router.get('/products', productController.getAllProducts)
router.get('/products/:productId', productController.getProduct)
router.get('/provider/products', providerAuth, productController.getOwnProducts)

router.patch('/provider/products/:productId', providerAuth, productController.updateProduct)

router.delete('/provider/products/:productId', providerAuth, productController.deleteProduct)

module.exports = router