import React from 'react'
import { Button, Form } from 'react-bootstrap'

export const LoginForm = ({
    handleLogin,
    username,
    password,
    setUsername,
    setPassword,
}) => {
    return (
        <Form
            onSubmit={handleLogin}
            data-bs-theme="dark"
            style={{ width: 'max-content' }}
        >
            <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    name="username"
                    onChange={({ target }) => setUsername(target.value)}
                    data-testid="username"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    name="password"
                    onChange={({ target }) => setPassword(target.value)}
                    data-testid="password"
                />
            </Form.Group>
            <Button type="submit" style={{ marginTop: 10 }}>
                Login
            </Button>
        </Form>
    )
}
