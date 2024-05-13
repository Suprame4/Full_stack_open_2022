require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const requestLogger = require('./utils/middleware')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const mongoUrl = process.env.MONGO_URI

console.log("connecting to mongo...")
mongoose.connect(mongoUrl)
    .then(() => {
        console.log("connected to mongoDB")
    })
    .catch((error) => {
        console.log('error connecting to mongoDB: ', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', blogsRouter)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})