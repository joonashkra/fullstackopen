import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Button, Form } from 'react-bootstrap'

const CreateBlogForm = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const handleCreateBlog = (event) => {
        event.preventDefault()
        const newBlog = { title, author, url }
        dispatch(createBlog(newBlog)).then((response) => {
            if (response !== 201) {
                dispatch(showNotification(`Invalid input.`, 5, true))
                return
            }
            dispatch(showNotification(`New blog "${newBlog.title}" added.`, 5))
            blogFormRef.current.toggleVisibility()
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    const blogFormRef = useRef()

    return (
        <Togglable buttonLabels={['New Blog', 'Cancel']} ref={blogFormRef}>
            <Form
                onSubmit={handleCreateBlog}
                style={{ width: 'max-content', paddingBlock: 10 }}
            >
                <Form.Group style={{ width: 'max-content', paddingBlock: 5 }}>
                    <Form.Control
                        type="text"
                        name="title"
                        value={title}
                        placeholder="Title..."
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </Form.Group>
                <Form.Group style={{ width: 'max-content', paddingBlock: 5 }}>
                    <Form.Control
                        type="text"
                        name="author"
                        value={author}
                        placeholder="Author..."
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </Form.Group>
                <Form.Group style={{ width: 'max-content', paddingBlock: 5 }}>
                    <Form.Control
                        type="text"
                        name="url"
                        value={url}
                        placeholder="Url..."
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </Form.Group>
                <Button type="submit">Create Blog</Button>
            </Form>
        </Togglable>
    )
}

export default CreateBlogForm
