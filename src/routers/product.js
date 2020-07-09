const express = require('express')
const productController = require('../controllers/product')
const providerAuth = require('../middlewares/providerAuth')
const router = express.Router()

router.post('/provider/products', providerAuth, productController.addProduct)

router.get('/products', productController.getAllProducts)
router.get('/product/:productId', productController.getProduct)
router.get('/provider/products', providerAuth, productController.getOwnProducts)

router.patch('/provider/products/:productId', providerAuth, productController.updateProduct)

router.delete('/provider/products', providerAuth, productController.deleteProduct)

module.exports = router