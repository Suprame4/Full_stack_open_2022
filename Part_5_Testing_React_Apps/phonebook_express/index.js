require('dotenv').config()
const Contact = require('./models/contact')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

let persons = [
    { 
      id: 1,
      name: "Arto Hellas", 
      number: "040-123456"
    },
    { 
      id: 2,
      name: "Ada Lovelace", 
      number: "39-44-5323523"
    },
    { 
      id: 3,
      name: "Dan Abramov", 
      number: "12-43-234345"
    },
    { 
      id: 4,
      name: "Mary Poppendieck", 
      number: "39-23-6423122"
    }
]

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
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message})
    }

    next(error)
}

//create middleware to catch unknown request routes
const unknownEndpoints = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(express.json())
app.use(requestLogger)
//app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('build'))


app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Contact.find({}).then(contact => {
        response.json(contact)
    })
})

//backend step2
app.get('/info', (request, response) => {
    //map ids
    var ids = persons.map( person => person.id)
    //find the max id 
    const count = Math.max(...ids)
    console.log(count)

    let date = Date()
    response.send(`Phonebook has info for ${count} 
        <br>
        ${date}`)
})

//change to use mongoose findById method 
app.get('/api/persons/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
})

//backend step4 - delete
app.delete('/api/persons/:id', (request, response, next) => {
    
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

//add a put request to update any contacts 
//put will be tested in postman 
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const contact = {
        name: body.name,
        number: body.number

    }

    Contact.findByIdAndUpdate(request.params.id, contact, { new: true})
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

//backend step5 - POST
app.post('/api/persons', (request, response) => {
    const body = request.body 
    //console.log(request.body.name)
    
    if(!body.name){
        console.log(body.name)
        return response.status(400).json({
            error: 'name missing'
        })
    }
    if (!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }
    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unqiue'
        })
    }

    const person = new Contact({
        name: body.name,
        number: body.number,
        
    })

    person.save().then(savedContact => {
        response.json(savedContact)
    }).catch(error => {
        console.log("ERROR message: ", error)
    })
})


app.use(unknownEndpoints)
app.use(errorHandler)

//use the environment variables defined in .env
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})