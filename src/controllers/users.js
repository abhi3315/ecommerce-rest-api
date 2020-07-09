const User = require('../models/user')
const Product = require('../models/product')
const userController = {}

userController.create = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

userController.login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
}

userController.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token)
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

userController.logoutAll = async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

userController.profile = async (req, res) => {
    res.send(req.user)
}

userController.addProductToCart = async (req, res) => {
    try {
        res.user.cart.concate([{
            productId: req.params.productId,
            quantity: req.query.quantity,
            addedToCart: new Date()
        }])
        await req.user.save()
        const product = await Product.findById({ _id: req.params.productId })
        product.stock = product.stock - 1
        await product.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

userController.removeProductFromCart = async (req, res) => {
    try {
        req.user.cart = req.user.cart.filter(product => product.productId !== req.params.productId)
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

userController.emptyCart = async (req, res) => {
    try {
        req.user.cart = []
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

userController.getCartProducts = async (req, res) => {
    try {
        await req.user.populate('cart.productId').execPopulate()
        res.send(user.cart)
    } catch (e) {
        res.status(500).send()
    }
}

userController.update = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'mobile', 'email', 'paymentCard', 'password', 'address']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) return res.status(400).send({ error: "Invalid update!" })

    try {
        updates.forEach(update => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
}

userController.delete = async (req, res) => {
    try {
        await req.user.remove()
        res.send(req.user)
    } catch (e) {
        res.status(500).send()
    }
}

module.exports = userController