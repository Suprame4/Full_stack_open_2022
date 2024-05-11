const contactsRouter = require("express").Router();
const Contact = require("../models/contact");

// contactRouter.get('/', (request, response) => {
//     response.send('<h1>Hello World!</h1>')
// })

contactsRouter.get('/', async (request, response) => {
    await Contact.find({}).then(contact => {
        response.json(contact)
    })
})

//backend step2
contactsRouter.get('/info', (request, response) => {
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
contactsRouter.get('/:id', (request, response) => {
    Contact.findById(request.params.id).then(contact => {
        response.json(contact)
    })
})

//backend step4 - delete
contactsRouter.delete('/:id', (request, response, next) => {

    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})
 
contactsRouter.put('/:id', (request, response, next) => {
    const { name, number } = request.body

    // const contact = {
    //     name: body.name,
    //     number: body.number
    // }

    Contact.findByIdAndUpdate(
        request.params.id, 
        { name, number }, 
        { new: true, runValidators: true, context: 'query' }
    )
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))
})

//backend step5 - POST
contactsRouter.post('/', (request, response) => {
    const body = request.body 

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
    // Model.find() seems to be causing an error comment out for now  
    // if ( await Contact.find(person => person.name === body.name)){
    //     return response.status(400).json({
    //         error: 'name must be unqiue'
    //     })
    // }

    const person = new Contact({
        name: body.name,
        number: body.number,

    })

    person.save().then(savedContact => {
        response.json(savedContact)
    }).catch(error => {
            next(error);
    })
})

module.exports = contactsRouter; 