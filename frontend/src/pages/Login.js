import React, { useEffect, useState, useContext } from 'react'
import { Link } from "react-router-dom";

import GlobalCsrfTokenStateContext from '../contexts/GlobalCsrfTokenStateContext'

import { loginUser } from '../api/services/UserService'

const Login = ({ setAuth }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const csrfToken = useContext(GlobalCsrfTokenStateContext)

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    console.log('username: ' + username + ', password: ' + password)

    if (username.trim().length > 0 && password.trim().length > 0) {
      if (username.trim().length > 1000 || password.trim().length > 1000) {
        console.log('username and/or password is not between 1 and 1000 characters.')
        return
      }

      loginUser({ csrfToken: csrfToken.csrfToken, username, password }).then(status => {
        if (status === 200) {
          console.log('user has been logged in!')
          setAuth(true)
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
      })

    } else {
      console.log('username and/or password is not between 1 and 1000 characters.')
    }
  }

  useEffect(() => {

  }, [])

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