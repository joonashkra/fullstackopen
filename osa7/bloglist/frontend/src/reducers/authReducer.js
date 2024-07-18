import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const authSlice = createSlice({
    name: 'auth',
    initialState: null,
    reducers: {
        setAuth(state, action) {
            return action.payload
        },
    },
})

export const logIn = (username, password) => {
    return async (dispatch) => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch(setAuth(user))
            return 200
        } catch (error) {
            return error.response.status
        }
    }
}

export const checkUser = () => {
    return async (dispatch) => {
        const loggedInUser = window.localStorage.getItem('loggedInUser')
        if (loggedInUser) {
            const user = JSON.parse(loggedInUser)
            blogService.setToken(user.token)
            dispatch(setAuth(user))
        } else dispatch(setAuth(null))
    }
}

export default authSlice.reducer
export const { setAuth } = authSlice.actions
