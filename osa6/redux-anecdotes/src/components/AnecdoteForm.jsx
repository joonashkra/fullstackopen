import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm() {
    const dispatch = useDispatch()

    const create = (event) => {
        event.preventDefault()
        const content = event.target.content.value
        dispatch(createAnecdote(content))
        dispatch(showNotification(`Created anecdote "${content}".`, 5))
        event.target.content.value = ''
    }

  return (
    <div>
        <h2>create new</h2>
            <form onSubmit={create}>
            <input name='content'/>
            <button type='submit'>create</button>
        </form>
    </div>
    
  )
}
