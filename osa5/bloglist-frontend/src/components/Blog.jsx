import { useState } from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLikeBlog, handleDeleteBlog, user }) => {

  const [likes, setLikes] = useState(blog.likes)

  const likeBlog = () => {
    const updatedBlog = { ...blog, likes: likes+1 }
    handleLikeBlog(updatedBlog)
    setLikes(likes + 1)
  }

  return (
    <div data-testid="blog-element">
      <p>{blog.title}, {blog.author}</p>
      <Togglable buttonLabels={['View', 'Hide']}>
        <ul>
          <li>{blog.url}</li>
          <li data-testid="blog-likes">
              likes {likes} <button title="like blog" onClick={likeBlog}>like</button>
          </li>
          <li>{blog.user.name}</li>
        </ul>
        {blog.user.username === user.username &&
            <button style={{ alignSelf: 'end', backgroundColor: 'red', color: 'white' }} onClick={() => handleDeleteBlog(blog)}>Delete</button>
        }
      </Togglable>
    </div>
  )
}


export default Blog