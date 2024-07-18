import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'
import { showNotification } from '../reducers/notificationReducer'
import {
    Button,
    Container,
    FloatingLabel,
    Form,
    ListGroup,
} from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Blog = ({ blog, authUser }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const [likes, setLikes] = useState(blog?.likes || 0)

    useEffect(() => {
        if (blog) {
            setLikes(blog.likes)
        }
    }, [blog])

    const handleDeleteBlog = () => {
        if (!window.confirm(`Delete blog "${blog.title}"?`)) return
        dispatch(deleteBlog(blog)).then((response) => {
            if (response !== 204) {
                dispatch(
                    showNotification(
                        `Error deleting blog "${blog.title}".`,
                        5,
                        true
                    )
                )
                return
            }
            dispatch(
                showNotification(`Deleted blog "${blog.title}" succesfully.`, 5)
            )
        })
        navigate('/')
    }

    const handleComment = (e) => {
        e.preventDefault()
        const newComment = { text: comment }
        dispatch(commentBlog(blog, newComment)).then((response) => {
            if (response !== 201) {
                dispatch(showNotification(`Error sending comment.`, 5, true))
                return
            }
            dispatch(showNotification(`Comment posted succesfully.`, 5))
            setComment('')
        })
    }

    const handleLikeBlog = () => {
        const updatedBlog = { ...blog, likes: likes + 1 }
        dispatch(likeBlog(updatedBlog))
        setLikes(likes + 1)
    }

    if (!blog) return <>loading...</>

    return (
        <Container data-testid="blog-element">
            <div>
                <h1>
                    {blog.title}, {blog.author}
                </h1>
                {blog.user.username === authUser.username && (
                    <Button onClick={handleDeleteBlog}>Delete</Button>
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    gap: 20,
                    paddingTop: 20,
                    justifyContent: 'space-around',
                }}
            >
                <div>
                    <h3>Info</h3>
                    <ListGroup
                        style={{
                            listStyleType: 'none',
                            paddingLeft: 0,
                            alignSelf: 'center',
                            width: 'max-content',
                        }}
                    >
                        <ListGroup.Item>
                            <a href={blog.url}>{blog.url}</a>
                        </ListGroup.Item>
                        <ListGroup.Item data-testid="blog-likes">
                            likes {likes}{' '}
                            <Button title="like blog" onClick={handleLikeBlog}>
                                like
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            added by {blog.user.name}
                        </ListGroup.Item>
                    </ListGroup>
                </div>
                <div>
                    <div style={{ marginBottom: 20 }}>
                        <h3>Comments</h3>
                        {blog.comments.length > 0 ? (
                            <ListGroup>
                                {blog.comments.map((comment) => (
                                    <ListGroup.Item key={comment.id}>
                                        {comment.text}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>
                    <Form onSubmit={handleComment}>
                        <FloatingLabel
                            controlId="floatingTextarea2"
                            label="Leave a comment..."
                            style={{ marginBottom: 5 }}
                        >
                            <Form.Control
                                as="textarea"
                                name="comment"
                                onChange={(e) => setComment(e.target.value)}
                                value={comment}
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                        <Button type="submit">Send</Button>
                    </Form>
                </div>
            </div>
        </Container>
    )
}

export default Blog
