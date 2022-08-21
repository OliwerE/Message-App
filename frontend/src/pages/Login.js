import React, { useState } from 'react'
import { Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    console.log('username: ' + username + ', password: ' + password)

    if (username.trim().length <= 1000 && username.trim().length > 0 && password.trim().length <= 1000 && password.trim().length > 0) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'No-Store'
        },
          body: JSON.stringify({ username, password })
      }).then(res => {
        return res.status
      }).then(status => {
        if (status === 200) {
          console.log('user has been logged in!')
        } else if (status === 400) {
          console.log('something went wrong')
          // Add status message
        } else if (status === 401) {
          console.log('something went wrong')
          // Add status message
        } else if (status === 500) {
          console.log('something went wrong')
          // Add status message
        } else {
          console.log('something went wrong')
          // Add status message
        }

      }).catch(err => {
        console.error(err)
      })
    } else {
      console.log('username and/or password is not between 1 and 1000 characters.')
      // ToDo: Create modal
    }
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <h1>Message App</h1>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} required/>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
          <input type='submit' value='Login'/>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login