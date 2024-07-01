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

module.exports = { dummy, totalLikes, favouriteBlog }