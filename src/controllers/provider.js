const Provider = require('../models/provider')
const providerController = {}

providerController.create = async (req, res) => {
    const provider = new Provider(req.body)
    try {
        await provider.save()
        const token = await provider.generateAuthToken()
        res.status(201).send({ provider, token })
    } catch (e) {
        res.status(400).send(e)
    }
}

providerController.login = async (req, res) => {
    try {
        const provider = await Provider.findByCredentials(req.body.email, req.body.password)
        const token = await provider.generateAuthToken()
        res.send({ provider, token })
    } catch (e) {
        res.status(400).send()
    }
}

providerController.logout = async (req, res) => {
    try {
        req.provider.tokens = req.provider.tokens.filter(token => token.token !== req.token)
        await req.provider.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

providerController.logoutAll = async (req, res) => {
    try {
        req.provider.tokens = []
        await req.provider.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
}

providerController.profile = async (req, res) => {
    res.send(req.provider)
}

providerController.update = async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'commercialName', 'mobile', 'email', 'banksAccount', 'password', 'address']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))

    if (!isValidUpdate) return res.status(400).send({ error: "Invalid update!" })

    try {
        updates.forEach(update => req.provider[update] = req.body[update])
        await req.provider.save()
        res.send(req.provider)
    } catch (e) {
        res.status(400).send(e)
    }
}

providerController.delete = async (req, res) => {
    try {
        await req.provider.remove()
        res.send(req.provider)
    } catch (e) {
        res.status(500).send()
    }
}


module.exports = providerController