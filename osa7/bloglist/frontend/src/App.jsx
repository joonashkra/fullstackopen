import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import CreateBlogForm from './components/CreateBlogForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import {
    createBlog,
    deleteBlog,
    initBlogs,
    likeBlog,
} from './reducers/blogReducer'
import { checkUser, logIn } from './reducers/userReducer'

const App = () => {
    const blogs = useSelector((state) => state.blogs)
    const user = useSelector((state) => state.user)

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    useEffect(() => {
        dispatch(checkUser())
    }, [])

    const blogFormRef = useRef()

    const handleLogin = (event) => {
        event.preventDefault()
        dispatch(logIn(username, password)).then((response) => {
            if (response !== 200) {
                dispatch(
                    showNotification('Wrong username or password.', 5, true)
                )
                return
            }
            setUsername('')
            setPassword('')
        })
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        dispatch(showNotification(`Logging out.`, 5))
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    const handleCreateBlog = (newBlog) => {
        dispatch(createBlog(newBlog)).then((response) => {
            if (response !== 201) {
                dispatch(showNotification(`Invalid input.`, 5, true))
                return
            }
            dispatch(showNotification(`New blog "${newBlog.title}" added.`, 5))
            blogFormRef.current.toggleVisibility()
        })
    }

    const handleLikeBlog = (blog) => {
        dispatch(likeBlog(blog))
    }

    const handleDeleteBlog = (blog) => {
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
    }

    if (!user) {
        return (
            <div>
                <Notification />
                <h2>Log in to application</h2>
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                />
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <h2>blogs</h2>
            <Notification />
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <p>Logged in as {user.username}</p>
                <button onClick={handleLogout}>Log out</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {blogs.map((blog) => (
                    <div
                        key={blog.id}
                        style={{
                            display: 'flex',
                            border: '1px solid black',
                            width: 'max-content',
                            padding: '5px',
                            backgroundColor: 'lightgray',
                        }}
                    >
                        <Blog
                            blog={blog}
                            handleLikeBlog={handleLikeBlog}
                            handleDeleteBlog={handleDeleteBlog}
                            user={user}
                        />
                    </div>
                ))}
            </div>
            <div>
                <Togglable
                    buttonLabels={['New Blog', 'Cancel']}
                    ref={blogFormRef}
                >
                    <CreateBlogForm handleCreateBlog={handleCreateBlog} />
                </Togglable>
            </div>
        </div>
    )
}

export default App
