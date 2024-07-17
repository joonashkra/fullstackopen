import React, { useState } from 'react'

const CreateBlogForm = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const createBlog = (event) => {
        event.preventDefault()
        const newBlog = { title, author, url }
        handleCreateBlog(newBlog)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={createBlog}>
            <div>
                <label>Title: </label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    placeholder="Title..."
                    onChange={({ target }) => setTitle(target.value)}
                />
            </div>
            <div>
                <label>Author: </label>
                <input
                    type="text"
                    name="author"
                    value={author}
                    placeholder="Author..."
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </div>
            <div>
                <label>Url: </label>
                <input
                    type="text"
                    name="url"
                    value={url}
                    placeholder="Url..."
                    onChange={({ target }) => setUrl(target.value)}
                />
            </div>
            <button type="submit">Create Blog</button>
        </form>
    )
}

export default CreateBlogForm
