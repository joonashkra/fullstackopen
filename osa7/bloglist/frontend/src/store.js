import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import authReducer from './reducers/authReducer'

export const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogReducer,
        auth: authReducer,
        users: userReducer,
    },
})
