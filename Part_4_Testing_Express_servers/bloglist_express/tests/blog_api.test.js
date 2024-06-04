const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

// creates a superagent object
const api = supertest(app)
// use supertest package to help with writing api tests

describe('test the api', () => {
    
    beforeEach( async () => {
        await Blog.deleteMany({})
        
        let blogObject = new Blog(helper.initialBlogs[0])
        await blogObject.save()
    
        blogObject = new Blog(helper.initialBlogs[1])
        await blogObject.save()
    })

    test('notes are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are two blogs', async () => {
        const response = await api.get('/api/blogs')

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('verify that the unique identifier for blog post is named id', async () => {
        const response = await api.get('/api/blogs')
        const blog1 = response.body[0]

        assert.equal(Object.keys(blog1)[4], 'id')
    })

    test('verify a blog can be added', async () => {
        const blog = {
            "title":"async/await simplifies making async calls",
            "author":"ES7",
            "url":"https://ecma-international.org/",
            "likes": 8
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)

        const titles = blogs.map( r => r.title)
        assert(titles.includes('async/await simplifies making async calls'))
    })

    test('verify that the likes property will default to 0 when omitted in a request', async () => {
        
        const blog = {
            "title":"async/await simplifies making async calls",
            "author":"ES7",
            "url":"https://ecma-international.org/"
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()

        assert.equal(blogs[2].likes, 0)
    })

    test('verify that if the title is omitted a 400 will be returned', async () => {
        const blog = {
            "author":"ES7",
            "url":"https://ecma-international.org/",
            likes: 9
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    })

    test('verify that a blog can be deleted', async () => {
        const blogs = await helper.blogsInDb()
        const blogToDelete = blogs[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        // continue to verify with assert statements
        const blogsUpdate = await helper.blogsInDb()
        const authors = blogsUpdate.map(r => r.author)

        assert(!authors.includes(blogToDelete.author))
        assert.strictEqual(blogsUpdate.length, helper.initialBlogs.length - 1)
    })

    test('verify that a blog can be updated', async () => {
        const blogs = await helper.blogsInDb()
        const firstBlog = blogs[0]
        const blogToUpdate = {
            ...firstBlog,
            author: "PUT test"
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(blogToUpdate)
            .expect(200)
        
        const blogsUpdate = await helper.blogsInDb()
        const authors = blogsUpdate.map(r => r.author)
        console.log("TEST: ", authors)
        assert(authors.includes("PUT test"))
    })
}) 

after(async () => {
    await mongoose.connection.close()
})