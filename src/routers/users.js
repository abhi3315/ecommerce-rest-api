const express = require('express')
const userAuth = require('../middlewares/userAuth')
const userController = require('../controllers/users')
const router = express.Router()

router.post('/users', userController.create)
router.post('/users/login', userController.login)
router.post('/users/logout', userAuth, userController.logout)
router.post('/users/logoutAll', userAuth, userController.logoutAll)

router.get('/users/me', userAuth, userController.profile)

router.patch('/users/me', userAuth, userController.update)

router.delete('/users/me', userAuth, userController.delete)

module.exports = router