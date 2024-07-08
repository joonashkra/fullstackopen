import { useState } from "react"
import Togglable from "./Togglable"
import blogService from '../services/blogs'

export const Blog = ({ blog, handleLikeBlog }) => {

  const [likes, setLikes] = useState(blog.likes)

  const likeBlog = () => {
    const updatedBlog = {...blog, likes: likes+1}
    handleLikeBlog(updatedBlog)
    setLikes(likes + 1)
  }

  return (
    <>
      <p>{blog.title}, {blog.author}</p>
      <Togglable buttonLabels={["view", "hide"]}>
          <ul>
            <li>{blog.url}</li>
            <li>
              likes {likes} <button title="like blog" onClick={likeBlog}>like</button>
            </li>
            <li>{blog.user.name}</li>
          </ul>
      </Togglable>
    </>
  )
}


export default Blog