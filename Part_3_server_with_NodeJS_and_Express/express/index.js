//import the express module 
const express = require('express')
const app = express()


let notes = [
    {
      id: 1,
      content: "HTML is easy",
      date: "2022-05-30T17:30:31.098Z",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only Javascript",
      date: "2022-05-30T18:39:34.091Z",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      date: "2022-05-30T19:20:14.298Z",
      important: true
    }
  ]

app.use(express.json())

//define two routes to the application - The first one defines an event 
//handler that is used to handle HTTP GET requests made to the app's / root
app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

//view the notes 
app.get('/api/notes', (resquest, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    
    if (note){
        response.json(note)
    } else {

        response.status(404).end()
    }
})

//deleting resources
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
//if deleting the note was successful, meaning that the note exists and is removed,
//respond to the request with the status code 204 no content and 
//return no data with the response 
    response.status(204).end()
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
    if(!body.content){
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const note = {
        content: body.content,
        important: body.important || false,
        date: new Date(),
        id: generateId()
    }

    notes = notes.concat(note)

    response.json(note)
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})


