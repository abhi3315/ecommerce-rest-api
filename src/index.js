const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')
const providerRoute = require('./routers/provider')
const productRoute = require('./routers/product')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)
app.use(providerRoute)
app.use(productRoute)

app.listen(3000, () => console.log('Server is running'))