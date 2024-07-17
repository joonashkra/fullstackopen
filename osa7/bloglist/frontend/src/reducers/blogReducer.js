import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return state.concat(action.payload)
        },
    },
})

export const initBlogs = () => {
    return async (dispatch) => {
        try {
            const blogs = await blogService.getAll()
            blogs.sort((a, b) => b.likes - a.likes)
            dispatch(setBlogs(blogs))
        } catch (error) {
            console.error(error)
        }
    }
}

export const createBlog = (blog) => {
    return async (dispatch) => {
        try {
            const newBlog = await blogService.create(blog)
            dispatch(addBlog(newBlog))
            return 201
        } catch (error) {
            return error.response.status
        }
    }
}

export const likeBlog = (blog) => {
    return async (dispatch, getState) => {
        const blogs = getState().blogs
        const updatedBlog = await blogService.like(blog)
        dispatch(
            setBlogs(
                blogs.map((blog) =>
                    blog.id !== updatedBlog.id ? blog : updatedBlog
                )
            )
        )
    }
}

export const deleteBlog = (blog) => {
    return async (dispatch, getState) => {
        try {
            const id = blog.id
            const blogs = getState().blogs
            await blogService.remove(blog)
            dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
            return 204
        } catch (error) {
            return error.response.status
        }
    }
}

export const { setBlogs, addBlog } = blogSlice.actions
export default blogSlice.reducer
