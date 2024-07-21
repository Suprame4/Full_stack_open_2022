const blogsRouter = require('express').Router() // create a router object 
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if ( authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
}

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.status(200).json(blogs)
      })
  })
  
blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if( blog ){
    response.json(blog)
  }
  else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
  
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if( !decodedToken.id ){
      return response.status(401).json({ error: 'token invalid'})
    }

    const user = await User.findById(decodedToken.id)
  
    if( !body.title ){
      return response.status(400).json({ error: "Missing title for blog"})
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  
    response.status(201).json(savedBlog)
  })


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true})
    .then( updateBlog => {
      response.json(updateBlog)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter; 