import React, { useContext } from 'react'
import { useNavigate } from "react-router-dom"

import GlobalCsrfTokenStateContext from '../../contexts/GlobalCsrfTokenStateContext'

import { logoutUser } from '../../api/services/UserService'

const Logout = ({ auth, setAuth, updateCsrfToken }) => {
  const csrfToken = useContext(GlobalCsrfTokenStateContext)

  const navigate = useNavigate()

  const handleFormSubmit = e => {
    e.preventDefault()

    logoutUser({ csrfToken: csrfToken.csrfToken }).then(status => {
      if (status === 200) {
        console.log('user has been logged out!') // add status msg
        setAuth(false)
        navigate('/')
        updateCsrfToken()
      } else {
        console.log('something went wrong')
        console.error(status)
        // Add status message
      }
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