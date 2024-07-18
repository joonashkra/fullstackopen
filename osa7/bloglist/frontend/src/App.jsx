import { useState, useEffect } from 'react'
import { LoginForm } from './components/LoginForm'
import { Notification } from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'
import { checkUser, logIn } from './reducers/authReducer'
import { BlogList } from './components/BlogList'
import { Routes, Route, useMatch } from 'react-router-dom'
import { UserList } from './components/UserList'
import { User } from './components/User'
import { initBlogs } from './reducers/blogReducer'
import { initUsers } from './reducers/userReducer'
import Blog from './components/Blog'
import { NavBar } from './components/NavBar'
import { Container } from 'react-bootstrap'

const App = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkUser())
    }, [])

    useEffect(() => {
        dispatch(initBlogs())
    }, [])

    useEffect(() => {
        dispatch(initUsers())
    }, [])

    const authUser = useSelector((state) => state.auth)
    const blogs = useSelector((state) => state.blogs)
    const users = useSelector((state) => state.users)

    const blogMatch = useMatch('/blogs/:id')
    const blog = blogMatch
        ? blogs.find((blog) => blog.id === blogMatch.params.id)
        : null

    const userMatch = useMatch('/users/:id')
    const user = userMatch
        ? users.find((user) => user.id === userMatch.params.id)
        : null

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

    if (!authUser) {
        return (
            <Container>
                <Notification />
                <h2>Log in to BlogApp</h2>
                <LoginForm
                    handleLogin={handleLogin}
                    username={username}
                    password={password}
                    setPassword={setPassword}
                    setUsername={setUsername}
                />
            </Container>
        )
    }

    return (
        <Container
            data-bs-theme="dark"
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
        >
            <NavBar authUser={authUser} />
            <Routes>
                <Route path="/" element={<BlogList blogs={blogs} />} />
                <Route path="/users" element={<UserList users={users} />} />
                <Route path="/users/:id" element={<User user={user} />} />
                <Route
                    path="/blogs/:id"
                    element={<Blog blog={blog} authUser={authUser} />}
                />
            </Routes>
        </Container>
    )
}

export default App
