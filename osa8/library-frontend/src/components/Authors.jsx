import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {

  const token = props.token

  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading...</div>
  }

  const authors = result.data.allAuthors

  const submitBirthyear = (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData)

    if ('authorName' in formValues && 'authorBirthyear' in formValues) {
      const { authorName: name, authorBirthyear: setBornTo } = formValues
      const author = authors.find(a => a.name === name)
      if (author) {
        editAuthor({ variables: { name, setBornTo: Number(setBornTo) } })
      }
    }
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>name</th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr/>
      {token && authors.length && 
        <div>
          <h3>Set author birthyear</h3>
          <form onSubmit={submitBirthyear}>
            <label htmlFor="authorName">name</label>
            <select name="authorName" id="author-name-select">
              {authors.map(a => (
                <option key={a.id} value={a.name}>{ a.name }</option>
              ))}
            </select>
            <br/>
            <label htmlFor="auhtorBirthyear">born</label>
            <input type="text" name='authorBirthyear' />
            <br/>
            <button type='submit'>update author</button>
          </form>
        </div> 
      }
    </div>
  )
}

export default Authors
