const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

console.log("connecting to mongo...", config.MONGO_URI)
mongoose.connect(config.MONGO_URI)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((error) => {
        console.log('error connecting to mongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app;