import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage({
        text: 'Wrong username or password',
        error: true
      })
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setMessage({
      text: 'Loggin out',
      error: false
    })
    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }

  const handleCreateBlog = async newBlog => {
    try {
      const blog = await blogService.create(newBlog)
      setBlogs(blogs.concat(blog))
      setMessage({
        text: `New blog "${blog.title}" added.`,
        error: false
      })
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      console.log(error)
      setMessage({
        text: 'Invalid input',
        error: true
      })
    }
  }

  const handleLikeBlog = async updatedBlog => {
    try {
      await blogService.like(updatedBlog)
    } catch (error) {
      console.error(error)
    }
  }

  const handleDeleteBlog = async blog => {
    const id = blog.id
    try {
      if(!window.confirm(`Delete blog "${blog.title}"?`)) return
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      setMessage({
        text: `Deleted blog "${blog.title}" succesfully.`,
        error: false
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} setMessage={setMessage} />
        <h2>Log in to application</h2>
        <LoginForm handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
      </div>
    )
  }

  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <h2>blogs</h2>
      <Notification message={message} setMessage={setMessage} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <p>Logged in as {user.username}</p>
        <button onClick={handleLogout}>Log out</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {blogs.map(blog =>
          <div key={blog.id} style={{ display: 'flex', border: '1px solid black', width: 'max-content', padding: '5px', backgroundColor: 'lightgray' }}>
            <Blog blog={blog} handleLikeBlog={handleLikeBlog} handleDeleteBlog={handleDeleteBlog} user={user} />
          </div>
        )}
      </div>
      <div>
        <Togglable buttonLabels={['New Blog', 'Cancel']} ref={blogFormRef}>
          <CreateBlogForm handleCreateBlog={handleCreateBlog}/>
        </Togglable>
      </div>
    </div>
  )
}

export default App