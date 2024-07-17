const { test, beforeEach, afterEach, after, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog")
const User = require("../models/user")
const listHelper = require('../utils/list_helper')
const testHelper = require("./test_helper")

const api = supertest(app)

let login

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api
        .post('/api/users')
        .send(testHelper.testUser)
        .expect(201)

    login = await api
        .post('/api/login')
        .send(testHelper.testUser)
        .expect(200)

    for (const blog of testHelper.testBlogList) {
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/);
    }

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

describe('author with most blogs', () => { 
    test('of empty list is zero', () => { 
        const result = listHelper.mostBlogs([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog is that blog', () => { 
        const result = listHelper.mostBlogs(testHelper.listWithOneBlog)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", blogs: 1 })
    })

    test('of a bigger list is calculated right', () => { 
        const result = listHelper.mostBlogs(testHelper.biggerBlogList)
        assert.deepStrictEqual(result, { author: "Robert C. Martin", blogs: 3 })
    })
})

describe('author with most likes', () => { 
    test('of empty list is zero', () => { 
        const result = listHelper.mostLikes([])
        assert.strictEqual(result, 0)
    })

    test('when list has only one blog is that blog', () => { 
        const result = listHelper.mostLikes(testHelper.listWithOneBlog)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 5 })
    })

    test('of a bigger list is calculated right', () => { 
        const result = listHelper.mostLikes(testHelper.biggerBlogList)
        assert.deepStrictEqual(result, { author: "Edsger W. Dijkstra", likes: 17 })
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
    test('works with valid data & credentials', async () => { 
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(testHelper.testBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const blogTitles = response.body.map(blog => blog.title)
    
        assert.strictEqual(response.body.length, testHelper.biggerBlogList.length + 1)
        assert(blogTitles.includes(testHelper.testBlog.title))
    })

    test('handles null likes correctly', async () => { 
        const blogWithNoLikes = testHelper.listWithOneBlog[0]
        delete blogWithNoLikes.likes
    
        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(blogWithNoLikes)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body[response.body.length-1].likes, 0)
    })

    test('handles null titles or urls correctly', async () => {
        testHelper.badBlogs.forEach(async badBlog => {
            await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(badBlog)
            .expect(400)
        })

        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, testHelper.biggerBlogList.length)
    })
})

describe('deletion of a blog', () => {
    test('works correctly & with credentials', async () => {
        const blogToDelete = await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${login.body.token}`)
            .send(testHelper.blogToDelete)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        await api
            .delete(`/api/blogs/${blogToDelete.body.id}`)
            .set('Authorization', `Bearer ${login.body.token}`)
            .expect(204)

        const blogs = await api.get('/api/blogs')
        assert.strictEqual(blogs.body.length, testHelper.biggerBlogList.length)
        assert(!blogs.body.map(blog => blog.title).includes("blogToDelete"))
    })
})

describe('updating a blog', () => { 
    test('works correctly', async () => { 
        const blog = await Blog.findOne({ title: 'Test Blog 1' })
        const updatedBlog = {...blog, likes: 100}

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(updatedBlog)
            .expect(200)

        const response = await api.get("/api/blogs")

        assert.strictEqual(response.body[0].likes, 100)
    })
})

after(async () => {
  await mongoose.connection.close()
})