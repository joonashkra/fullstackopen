import { useQuery } from '@apollo/client'
import React from 'react'
import { ME } from '../queries'
import Books from './Books'

export const Recommend = (props) => {

    const { data, loading } = useQuery(ME)

    if (!props.show) {
        return null
    }

    if(loading) return <>Loading...</>

    console.log(data)

    const username = data.me.username
    const favoriteGenre = data.me.favoriteGenre

  return (
    <div>
        <h3>Recommendations for { username }</h3>
        <p>Books in your favorite genre "{ favoriteGenre }"</p>
        <Books show={favoriteGenre} genre={favoriteGenre} />
    </div>
  )
}
