const blogsRouter = require('express').Router() // create a router object 
const Blog = require('../models/blog')

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

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    if( !blog.title ){
      return response.status(400).json({ error: "Missing title for blog"})
    }

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
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