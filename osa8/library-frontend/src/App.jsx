import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { useApolloClient, useSubscription } from "@apollo/client";
import LoginForm from "./components/LoginForm";
import { BOOK_ADDED, BOOK_DETAILS } from "./queries";
import { Recommend } from "./components/Recommend";

export const updateCache = (cache, addedBook) => {
  cache.modify({
    fields: {
      allBooks(existingBooks = []) {
        const newBookRef = cache.writeFragment({
          data: addedBook,
          fragment: BOOK_DETAILS
        })
        return [...existingBooks, newBookRef]
      }
    }
  })
}

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('library-user-token')
    if (!token && tokenFromStorage) {
      setToken(`Bearer ${token}`)
    }
  }, [token])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      window.alert("Book added: " + addedBook.title)
      updateCache(client.cache, addedBook)
    }
  })

  const logout = () => {
    localStorage.clear()
    setToken(null)
    client.resetStore()
  }

  return (
    <div>
      { 
        token ? <button onClick={logout}>Log out</button> 
        : <>
            <h3>Login</h3>
            <LoginForm setToken={setToken} />
          </> 
      }
      <hr/>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token && 
          <>
            <button onClick={() => setPage("add")}>add book</button>        
            <button onClick={() => setPage("recommend")}>recommend</button>
          </> 
        }
      </div>

      <Authors show={page === "authors"} token={token} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Recommend show={page === "recommend"} />
    </div>
  );
};

export default App;
