const express = require('express')
const providerAuth = require('../middlewares/providerAuth')
const providerController = require('../controllers/provider')
const router = express.Router()

router.post('/providers', providerController.create)
router.post('/providers/login', providerController.login)
router.post('/providers/logout', providerAuth, providerController.logout)
router.post('/providers/logoutAll', providerAuth, providerController.logoutAll)

router.get('/providers/me', providerAuth, providerController.profile)

router.patch('/providers/me', providerAuth, providerController.update)

router.delete('/providers/me', providerAuth, providerController.delete)

module.exports = router