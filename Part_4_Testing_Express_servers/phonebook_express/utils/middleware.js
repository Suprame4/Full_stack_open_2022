const logger = require('./logger');

//create middleware that will print info about every request that is sent to 
// server
const requestLogger = (req, res, next) => {
    console.log("Method: ", req.method)
    console.log("Path: ", req.path)
    console.log("Body: ", req.body)
    console.log("------")
    next()
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError'){
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint'})
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler
}