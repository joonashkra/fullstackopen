import React from 'react'
import CreateBlogForm from './CreateBlogForm'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

export const BlogList = ({ blogs }) => {
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
        <ListGroup
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
            <CreateBlogForm />
            {sortedBlogs.map((blog) => (
                <ListGroup.Item key={blog.id}>
                    <Link
                        to={`/blogs/${blog.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        {blog.title}, {blog.author}
                    </Link>
                </ListGroup.Item>
            ))}
        </ListGroup>
    )
}
