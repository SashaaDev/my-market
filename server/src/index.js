require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const { dbConfig } = require('./config/dbConfig')
const router = require('./routes/router')
mongoose
    .connect(dbConfig.uri, dbConfig.options)
    .then(() => {
        console.log('MongoDB connected')
    })
    .catch((err) => {
        console.log(err)
    })

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api', router)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})