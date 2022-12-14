import React, { useEffect, useState } from 'react'

import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'
import Logout from '../components/Dashboard/Logout'

import { getUsername } from '../api/services/UserService'

const Dashboard = ({ auth, setAuth, updateCsrfToken }) => {
  const [isChatRoomMenuOpen, setIsChatRoomMenuOpen] = useState(false)
  const [username, setUsername] = useState('')

  /*
  const handleToggleDashboardMenu = () => {
    if(isChatRoomMenuOpen) {
      setIsChatRoomMenuOpen(false)
    } else {
      setIsChatRoomMenuOpen(true)
    }
  }
  */

  useEffect(() => {

    getUsername().then(json => {
        setUsername(json.username)
      }).catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <div className='dashboard'>
      <Logout auth={auth} setAuth={setAuth} updateCsrfToken={updateCsrfToken} />
      <div className="dashboard-header">
        {/* <button onClick={handleToggleDashboardMenu}>Menu</button> */}
        <h1>Dashboard, Logged in user: {username}</h1>
      </div>
      {/* <ChatRoomMenu isOpen={isChatRoomMenuOpen} /> */}
      <div style={{ height: '600px' }}>
        <ChatRoom />
      </div>
    </div>
  )
}

export default Dashboard