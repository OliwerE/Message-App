import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'
import Logout from '../components/Dashboard/Logout'

import { getUsername } from '../api/services/UserService'

const Dashboard = ({ auth, setAuth, updateCsrfToken }) => {
  const [isChatRoomMenuOpen, setIsChatRoomMenuOpen] = useState(false)
  const [username, setUsername] = useState('')
  const [isSocketConnected, setIsSocketConnected] = useState(false)

  const handleToggleDashboardMenu = () => {
    if(isChatRoomMenuOpen) {
      setIsChatRoomMenuOpen(false)
    } else {
      setIsChatRoomMenuOpen(true)
    }
  }

  const socketUrl = process.env.REACT_APP_WEBSOCKET_URL
  let socket = useRef(null)

  useEffect(() => {
    socket.current = io(socketUrl, { // use option 2 instead?: https://stackoverflow.com/questions/73007362/socket-io-origin-set-but-anyways-getting-errors
      transports: ["websocket"], // Bypass cors
      path: '/socket/'
    })
    setIsSocketConnected(true)
  },[socketUrl])

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
        <button onClick={handleToggleDashboardMenu}>Menu</button>
        <h1>Dashboard, Logged in user: {username}</h1>
      </div>
      {isSocketConnected ? <ChatRoomMenu socket={socket} isOpen={isChatRoomMenuOpen} /> : null}
      <div style={{ height: '600px' }}>
        {isSocketConnected ? <ChatRoom socket={socket} /> : null}
      </div>
    </div>
  )
}

export default Dashboard