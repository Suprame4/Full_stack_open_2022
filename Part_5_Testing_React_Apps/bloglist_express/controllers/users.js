const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const { usersInDb } = require('../tests/test_helper')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if(!(username && password)){
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const users = await usersInDb()

    const usernames = users.map(u => u.username)

    if( usernames.includes(username)){
        return response.status(401).json({
            error: 'Username has to be unique.'
        })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs')
    response.json(users)
})

module.exports = usersRouter