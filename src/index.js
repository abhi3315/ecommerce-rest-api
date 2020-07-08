const express = require('express')
require('./db/mongoose')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(3000, () => console.log('Server is running'))