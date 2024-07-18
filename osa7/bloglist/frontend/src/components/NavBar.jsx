import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { showNotification } from '../reducers/notificationReducer'
import { Button, Navbar, Nav, NavbarText } from 'react-bootstrap'
import Notification from './Notification'

export const NavBar = ({ authUser }) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        window.localStorage.removeItem('loggedInUser')
        dispatch(showNotification(`Logging out.`, 5))
        setTimeout(() => {
            window.location.reload()
        }, 2000)
    }

    return (
        <Navbar
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                paddingInline: 20,
            }}
        >
            <Nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Navbar.Brand style={{ fontSize: 24 }}>BlogApp</Navbar.Brand>
                <Link to="/" style={{ textDecoration: 'none', fontSize: 20 }}>
                    Blogs
                </Link>
                <Link
                    to="/users"
                    style={{ textDecoration: 'none', fontSize: 20 }}
                >
                    Users
                </Link>
            </Nav>
            <Notification />
            <Nav style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Navbar.Text>Logged in as {authUser.username}</Navbar.Text>
                <Button onClick={handleLogout}>Log out</Button>
            </Nav>
        </Navbar>
    )
}
