const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/users')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(userRouter)

app.listen(3000, () => console.log('Server is running'))