import React from 'react'
import { Container, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export const User = ({ user }) => {
    if (!user) return <>Loading...</>

    return (
        <Container>
            <h1>{user.name}</h1>
            <h2>Added blogs</h2>
            <ListGroup>
                {user.blogs.length > 0 ? (
                    user.blogs.map((blog) => (
                        <ListGroup.Item key={blog.id}>
                            <Link
                                to={`/blogs/${blog.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                {blog.title}
                            </Link>
                        </ListGroup.Item>
                    ))
                ) : (
                    <p>No blogs yet.</p>
                )}
            </ListGroup>
        </Container>
    )
}
