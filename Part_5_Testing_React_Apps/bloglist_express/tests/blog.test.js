const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')
const blogs = require('../misc/blogs_for_test')

describe('test suite for the blog app', () => {
    test('dummy returns one', () => {
        const blogs = []

        const results = listHelper.dummy(blogs)
        assert.strictEqual(results, 1)
    })

    describe('total likes', () => {
        const listWithOneBlog = [
            {
              _id: '5a422aa71b54a676234d17f8',
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
              likes: 5,
              __v: 0
            }
          ]
        
        test('of empty list is zero', () => {
            const result = listHelper.totalLikes([]);
            assert.strictEqual(result, 0)
        })

        test('when list has only one blog equals the likes of that', () => {
            const result = listHelper.totalLikes(listWithOneBlog);
            assert.strictEqual(result, 5)
        })

        test('of a bigger list is calculated right', () => {
            const result = listHelper.totalLikes(blogs);
            console.log("TOTAL number of likes: ", result)
            assert.strictEqual(result, 36)

        })
    })

    describe("top blogs", () => {

        mostLikedBlog = {
            _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
            likes: 12,
            __v: 0
          }

        test('Most liked blog', () => {
            const result = listHelper.favoriteBlog(blogs)

            assert.deepStrictEqual(result, mostLikedBlog);
        })

        test("Most popular blogs", () => {
            //pending 
        })

        test("Most popular author", () => {
            //pending 
        })
    })
})