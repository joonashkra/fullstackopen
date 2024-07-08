import React, { useState } from 'react'

export const CreateBlogForm = ({ handleCreateBlog }) => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [url, setUrl] = useState("")

    const createBlog = (event) => {
        event.preventDefault()
        const newBlog = { title, author, url }
        handleCreateBlog(newBlog)
        setTitle("")
        setAuthor("")
        setUrl("")
    }

  return (
    <form onSubmit={createBlog}>
        <div>
            <label>Title: </label>
            <input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </div>
        <div>
            <label>Author: </label>
            <input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)}/>
        </div>
        <div>
            <label>Url: </label>
            <input type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)}/>
        </div>
        <button type='submit'>Create Blog</button>
    </form>
  )
}
