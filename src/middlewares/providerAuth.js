
const jwt = require('jsonwebtoken')
const Provider = require('../models/provider')

const providerAuth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decode = jwt.verify(token, 'myToken')
        const provider = await Provider.findOne({ _id: decode._id, 'tokens.token': token })

        if (!provider) throw new Error()

        req.token = token
        req.provider = provider

        next()
    } catch (e) {
        res.status(401).send({ error: 'Please Authenticate' })
    }
}

module.exports = providerAuth