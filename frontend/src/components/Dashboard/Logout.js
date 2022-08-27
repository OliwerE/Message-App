import React from 'react'
import { useNavigate } from "react-router-dom"

const Logout = ({ auth, setAuth }) => {
  const navigate = useNavigate();
  const handleFormSubmit = e => {
    e.preventDefault()

    fetch(`${process.env.REACT_APP_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'No-Store'
        },
          body: JSON.stringify({})
      }).then(res => {
        return res.status
      }).then(status => {
        if (status === 200) {
          console.log('user has been logged out!') // add status msg
          setAuth(false)
          navigate('/')
        } else {
          console.log('something went wrong')
          // Add status message
        }
      }).catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <input type='submit' value='Logout'/>
      </form>
    </>
  )
}

export default Logout