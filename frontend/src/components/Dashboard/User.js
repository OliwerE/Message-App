import React from 'react'

import Logout from './Logout'

const User = ({ username, auth, setAuth, updateCsrfToken }) => {
  return (
    <div className="user">
      <div className='info'>
        <img src='/logo192.png' height={75} width={75} alt='Avatar'/> {/* ToDo change hardcoded image! */}
        <h1>{username}</h1>
      </div>
      <Logout auth={auth} setAuth={setAuth} updateCsrfToken={updateCsrfToken} />
    </div>
  )
}

export default User