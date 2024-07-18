import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Container, Table } from 'react-bootstrap'

export const UserList = ({ users }) => {
    return (
        <Container>
            <h1>Users</h1>
            <Table style={{ textAlign: 'center' }}>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Blogs</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>
                                <Link
                                    to={`/users/${user.id}`}
                                    style={{
                                        textDecoration: 'none',
                                        fontSize: 18,
                                    }}
                                >
                                    {user.name}
                                </Link>
                            </td>
                            <td style={{ fontSize: 18 }}>
                                {user.blogs.length}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}
