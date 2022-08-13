import React from 'react'
import { Link } from "react-router-dom";

const Register = () => {
  const handleLoginSubmit = () => {
    alert('submit! register')
  }

  return (
    <div className='register-page'>
      <div className='register-box'>
        <h1>Message App</h1>
        <h2>Register</h2>
        <form onSubmit={handleLoginSubmit}>
          <input type='text' placeholder='username' required/>
          <input type='password' placeholder='password' required/>
          <input type='password' placeholder='Repeat Password' required/>
          <input type='submit' value='Register'/>
        </form>
        <p>Already have an account? <Link to="/">Login</Link></p>
      </div>
    </div>
  )
}

export default Register