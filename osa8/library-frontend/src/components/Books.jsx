import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [author, setAuthor] = useState('')
  const [genre, setGenre] = useState(props.genre || '')

  const { data, loading } = useQuery(ALL_BOOKS, { 
    variables: { author, genre }
  })

  if (!props.show) {
    return null
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const books = data.allBooks

  const authors = [...new Set(books.map(b => b.author))]
  const genres = [...new Set(books.map(b => b.genres).flat())]

  return (
    <div>
      <h2>books</h2>
      <form>
        <select name="author" id="book-author-select" value={author} onChange={e => setAuthor(e.target.value)}>
          <option value='' disabled={!author}>{ author ? 'Deselect' : 'Select author' }</option>
          {authors.map(a => (
            <option key={a.id} value={a.name}>{a.name}</option>
          ))}
        </select>
        <select name="genre" id="book-genre-select" value={genre} onChange={e => setGenre(e.target.value)}>
          <option value='' disabled={!genre}>{ genre ? 'Deselect' : 'Select genre' }</option>
          {genres.map((g, index) => (
            <option key={index} value={g}>{g}</option>
          ))}
        </select>
      </form>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
