export const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'VOTE':
            return `Voted for anecdote "${action.payload}".`
        case 'CREATE':
            return `Created anecdote "${action.payload}".`
        case 'ERROR': 
            return `Error: ${action.payload}.`
        case 'CLEAR':
            return null
        default:
            return null
    }
}