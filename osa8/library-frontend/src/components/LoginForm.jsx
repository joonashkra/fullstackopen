import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({ setError, setToken }) => {
  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data])

  const submit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const formValues = Object.fromEntries(formData)

    if ('username' in formValues && 'password' in formValues) {
        login({ variables: { username: formValues.username, password: formValues.password } })
    }
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username <input type='text' name='username' />
        </div>
        <div>
          password <input type='password' name='password' />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm