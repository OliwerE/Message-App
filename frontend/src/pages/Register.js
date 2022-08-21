import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault()

    if (username.trim().length > 0 && password.trim().length > 0) {
      if (username.trim().length > 1000 || password.trim().length > 1000) {
        console.log('username and/or password is not between 1 and 1000 characters.')
        // ToDo add message on screen
        return
      }

      if (password !== passwordRepeat) {
        console.log('Password does not match.')
        // ToDo add message on screen
        return
      }

      fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/register`, {
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
          console.log('user has been registered in!')
          navigate('/')
        } else if (status === 400) {
          console.log('Username and/or password is not between 1 and 1000')
          // Add status message
        } else if (status === 409) {
          console.log('Username already exist')
          // Add status message
        } else if (status === 500) {
          console.log('Internal server error')
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
      // ToDo add message on screen
    }
  }

  return (
    <div className='register-page'>
      <div className='register-box'>
        <h1>Message App</h1>
        <h2>Register</h2>
        <form onSubmit={handleLoginSubmit}>
          <input type='text' placeholder='username' onChange={(e) => setUsername(e.target.value)} required/>
          <input type='password' placeholder='password' onChange={(e) => setPassword(e.target.value)} required/>
          <input type='password' placeholder='Repeat Password' onChange={(e) => setPasswordRepeat(e.target.value)} required/>
          <input type='submit' value='Register'/>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  )
}

export default Register