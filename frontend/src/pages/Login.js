import React from 'react'
import { Link } from "react-router-dom";

const Login = () => {
  const handleLoginSubmit = () => {
    alert('submit!')
  }

  return (
    <div className='login-page'>
      <div className='login-box'>
        <h1>Message App</h1>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input type='text' placeholder='username' required/>
          <input type='password' placeholder='password' required/>
          <input type='submit' value='Login'/>
        </form>
        <p>Don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}

export default Login