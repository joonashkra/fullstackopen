import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        content: null,
        isError: false,
    },
    reducers: {
        setNotification(state, action) {
            const { content, isError } = action.payload
            state.content = content
            state.isError = isError
        },
    },
})

export const showNotification = (content, time, isError = false) => {
    return async (dispatch) => {
        const duration = time * 1000
        dispatch(setNotification({ content, isError }))
        setTimeout(() => {
            dispatch(setNotification({ content: null, isError: false }))
        }, duration)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
