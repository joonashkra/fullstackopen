import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    }
})

export const showNotification = (content, time) => {
    return async dispatch => {
        const duration = time*1000
        dispatch(setNotification(content))
        setTimeout(() => {
            dispatch(setNotification(null))
        }, duration)
    }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
