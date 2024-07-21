const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'HTML is easy',
        author: 'fullstack open',
        url: 'google.com',
        likes: 5
    },
    {
        title: 'Browser can execute only JavaScript',
        author: 'Chatgpt',
        url: 'openai.com',
        likes: 7
    }
]

const nonExistingId = async () => {

    const blog = new Blog({ content: 'willremovethissoon'})
    await blog.save()
    await blog.deleteOne()

    return blog._id.toString()
}

const blogsInDb = async () => {

    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, 
    nonExistingId, 
    blogsInDb,
    usersInDb
}