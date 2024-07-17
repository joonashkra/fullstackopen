import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const userSlice = createSlice({
    name: 'user',
    initialState: null,
    reducers: {
        setUser(state, action) {
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
            dispatch(setUser(user))
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
            dispatch(setUser(user))
        } else dispatch(setUser(null))
    }
}

export default userSlice.reducer
export const { setUser } = userSlice.actions
