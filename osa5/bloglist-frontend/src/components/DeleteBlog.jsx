import React from 'react'

export const DeleteBlog = ({ user, blog, handleDeleteBlog }) => {

    if(blog.user.username !== user.username) return null

    return (
        <button style={{ alignSelf: "end" }} onClick={() => handleDeleteBlog(blog)}>Delete</button>
    )
}
