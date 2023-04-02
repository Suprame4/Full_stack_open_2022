const express = require('express')
const morgan = require('morgan')
const app = express()

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

app.use(express.json())
//app.use(requestLogger)
app.use(morgan('tiny'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

//backend step3
app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})

//backend step4 - delete
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
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

    const person = {
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random() * (100 - 1) + 1)
    }

    persons = persons.concat(person)

    response.json(person)
    console.log(JSON.stringify(request.body))
})

//create middleware to catch unknown request routes
const unknownEndpoints = (req, res) => {
    res.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoints)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})