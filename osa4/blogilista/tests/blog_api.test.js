const { test, beforeEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const listHelper = require('../utils/list_helper')
const testHelper = require("./test_helper")

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(testHelper.biggerBlogList)
})

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
    test('of empty list is zero', () => { 
        const result = listHelper.totalLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog equals the likes of that', () => { 
        const result = listHelper.totalLikes(testHelper.listWithOneBlog)
        assert.strictEqual(result, 5)
    })

    test('of a bigger list is calculated right', () => { 
        const result = listHelper.totalLikes(testHelper.biggerBlogList)
        assert.strictEqual(result, 36)
    })
})

describe('most liked blog', () => { 
    test('of empty list is zero', () => { 
        const result = listHelper.favouriteBlog([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog is that blog', () => { 
        const result = listHelper.favouriteBlog(testHelper.listWithOneBlog)
        assert.strictEqual(result, testHelper.listWithOneBlog[0])
    })

    test('of a bigger list is calculated right', () => { 
        const result = listHelper.favouriteBlog(testHelper.biggerBlogList)
        assert.strictEqual(result, testHelper.biggerBlogList[2])
    })
})

describe('when there are blogs saved', () => { 
    test('correct amount of blogs are returned in json format', async () => { 
        const response = await api.get("/api/blogs")
          .expect(200)
          .expect("Content-Type", /application\/json/)
        
          assert.strictEqual(response.body.length, testHelper.biggerBlogList.length)
    })

    test('they are identified by id correctly', async () => {
        const response = await api.get("/api/blogs")
        const result = Object.keys(response.body[0]).includes("id")
        assert.strictEqual(result, true)
    })
})

describe('addition of a blog', () => { 
    test('works with valid data', async () => { 
        const newBlog = {
            title: "Test Blog",
            author: "Joonas Heikura",
            url: "http://testblog/fortesting.html",
            likes: 1337
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const blogTitles = response.body.map(blog => blog.title)
    
        assert.strictEqual(response.body.length, testHelper.biggerBlogList.length + 1)
        assert(blogTitles.includes('Test Blog'))
    })

    test('handles null likes correctly', async () => { 
        const blogWithNoLikes = {
            title: "Test Blog",
            author: "Joonas Heikura",
            url: "http://testblog/fortesting.html"
        }
    
        await api
            .post('/api/blogs')
            .send(blogWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[response.body.length-1].likes, 0)
    })

    test('handles null titles or urls correctly', async () => { 
        const invalidBlogs = [
            {
                author: "Joonas Heikura",
                url: "http://testblog/fortesting.html",
                likes: 100
            },
            {
                title: "Test Blog",
                author: "Joonas Heikura",
                likes: 100
            }
        ]
        
        await api
            .post('/api/blogs')
            .send(invalidBlogs[0])
            .expect(400)
    
        await api
            .post('/api/blogs')
            .send(invalidBlogs[1])
            .expect(400)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, testHelper.biggerBlogList.length)
    })
})

describe('deletion of a blog', () => {
    test('works correctly', async () => { 
        await api
            .delete(`/api/blogs/${testHelper.biggerBlogList[0]._id}`)
            .expect(204)

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, testHelper.biggerBlogList.length - 1)
    })
})

describe('updating a blog', () => { 
    test('works correctly', async () => { 
        const blog = testHelper.biggerBlogList[0]
        const updatedBlog = {...blog, likes: 100}

        await api
            .put(`/api/blogs/${blog._id}`)
            .send(updatedBlog)
            .expect(200)

        const response = await api.get("/api/blogs")

        assert.strictEqual(response.body[0].likes, 100)
    })
})

after(async () => {
  await mongoose.connection.close()
})