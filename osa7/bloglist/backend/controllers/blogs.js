const blogsRouter = require('express').Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const Comment = require("../models/comment")

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { text: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const { title, author, url, likes } = request.body

    if(!request.token) return response.status(401).json({ message: 'Invalid or missing token' })

    const user = request.user

    const newBlog = { title, author, url, likes, user }

    if(!newBlog.likes) newBlog.likes = 0

    if(!newBlog.title || !newBlog.url) return response.status(400).end()

    const blog = new Blog(newBlog)

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {

    console.log("comment:", request.body.text)
    console.log("blogid:", request.params.id)

    const comment = new Comment({
        text: request.body.text,
        blog: request.params.id
    })

    await comment.save()

    const blog = await Blog.findById(request.params.id)
    if(!blog) return response.status(404).json({ message: 'content missing' })
    
    blog.comments.push(comment)
    await blog.save()

    response.status(201).json(comment)
}) 

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    if(!blog) return response.status(404).json({ message: 'content missing' })

    const user = request.user

    if(!request.token || (blog.user.toString() !== user._id.toString())) return response.status(401).json({ message: 'Invalid or missing token' })

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body

    const blog = { title, author, url, likes }

    console.log(blog)

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .populate('user', { username: 1, name: 1 })
        .populate('comments', { text: 1 })

    response.json(updatedBlog)
})

module.exports = blogsRouter