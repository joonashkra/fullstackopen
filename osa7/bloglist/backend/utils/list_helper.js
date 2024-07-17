const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    if(blogs.length === 0) return 0

    const reducer = (sum, blog) => {
        return sum + blog.likes
    }

    return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
    if(blogs.length === 0) return 0

    const likes = blogs.map(blog => blog.likes)

    return blogs[likes.indexOf(Math.max(...likes))]
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0) return 0

    const authors = blogs.map(blog => blog.author)
    const occurencies = _.countBy(authors)

    const blogsCount = Math.max(...Object.values(occurencies))
    const author = Object.keys(occurencies).find(blogs => occurencies[blogs] === blogsCount)

    return {author, blogs: blogsCount}
}

const mostLikes = (blogs) => {
    if(blogs.length === 0) return 0

    const authorLikes = _.reduce(blogs, (result, blog) => {
        result[blog.author] = (result[blog.author] || 0) + blog.likes
        return result
    }, {})

    const mostLikedAuthor = _.maxBy(_.keys(authorLikes), (author) => authorLikes[author])

    return {
        author: mostLikedAuthor,
        likes: authorLikes[mostLikedAuthor]
    }
}

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes }