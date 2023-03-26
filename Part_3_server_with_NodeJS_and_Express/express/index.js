require('dotenv').config()
const express = require('express')
const app = express()
const Note = require('./models/note')

//update for cross origin resource sharing 
const cors = require('cors')

let notes = [
  
  ]

  const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path: ', request.path)
    console.log('Body: ', request.body)
    console.log('---')
    next()
  }

//create errorHandler 
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError'){
    return response.status(400).send({ error: 'malformatted id'})
  } else if (error.name === 'ValidationError'){
    return response.status(400).json({ error: error.message})
  }

  next(error)
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({error: 'unknown endpoint'})
}

app.use(express.json())
app.use(requestLogger)
app.use(cors())
app.use(express.static('build'))


/*const note = new Note(
  {
    content: 'Mongoose make it easy to use mongo',
    important: true
  })

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})*/

//define two routes to the application - The first one defines an event 
//handler that is used to handle HTTP GET requests made to the app's / root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//view the notes 
app.get('/api/notes', (resquest, response) => {
  Note.find({}).then(notes => {
    response.json(notes) 
  })
})



app.get('/api/notes/:id', (request, response) => {
   Note.findById(request.params.id)
   .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
   })
   .catch(error => next(error))
})

//deleting resources
app.delete('/api/notes/:id', (request, response) => {
    Note.findByIdAndUpdate(request.params.id)
      .then(result => {
        response.status(204).end()
      })
      .catch( error => next(error))
//if deleting the note was successful, meaning that the note exists and is removed,
//respond to the request with the status code 204 no content and 
//return no data with the response 
})

const generateId = () => {
    const maxId = notes.length > 0
        ? Math.max(...notes.map(n => n.id))
        : 0
    return maxId + 1
}

app.post('/api/notes', (request, response) => {
    const body = request.body 
    
    console.log(request.body.content)
    if(!body.content === undefined){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note =  new Note({
        content: body.content,
        important: body.important || false,
    })

    note.save().then(savedNote => {
      response.json(savedNote)
    })
})

app.put('/api/notes/:id', (request, response, next) => {
  const {content, important} = request.body

  Note.findByIdAndUpdate(
    request.params.id, 
    {content, important}, 
    {new: true, runValidators: true, context: 'query'})
    .then(updatedNote => {
      response.json(updatedNote)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})