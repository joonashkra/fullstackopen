import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from './services/anecdotes'
import AnecdoteContext from './AnecdoteContext'
import { useReducer } from 'react'
import { notificationReducer } from './reducers/notificationReducer'

const App = () => {

  const queryClient = useQueryClient()

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  const updateAnecdoteMutation = useMutation({ 
    mutationFn: voteAnecdote, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  const handleVote = (anecdote) => {
     updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
     notificationDispatch({ type: 'VOTE', payload: anecdote.content })
  }

  if(result.isLoading) return <div>loading data...</div>

  if(result.isError) return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  return (
    <AnecdoteContext.Provider value={[notification, notificationDispatch]}>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </AnecdoteContext.Provider>
  )
}

export default App
