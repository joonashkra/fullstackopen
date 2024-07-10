import React from 'react'

export const LoginForm = ({ handleLogin, username, password, setUsername, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor='username'>Username</label>
        <input type='text' value={username} name='username' onChange={({ target }) => setUsername(target.value)} data-testid="username" />
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input type='password' value={password} name='password' onChange={({ target }) => setPassword(target.value)} data-testid="password" />
      </div>
      <button type='submit'>Login</button>
    </form>
  )
}
