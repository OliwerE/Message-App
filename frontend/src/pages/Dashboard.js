import React, { useEffect, useState } from 'react'

import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'
import Logout from '../components/Dashboard/Logout'
import User from '../components/Dashboard/User'

import { getUsername } from '../api/services/UserService'

import { connectSocket } from '../api/socket'

const Dashboard = ({ auth, setAuth, updateCsrfToken }) => {
  const [username, setUsername] = useState('')
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  const [chatUsername, setChatUsername] = useState('')
  const [chatUserID, setChatUserID] = useState('')

  useEffect(() => {
    connectSocket()
    setIsSocketConnected(true)
  },[])

  useEffect(() => {

    getUsername().then(json => {
        setUsername(json.username)
      }).catch(err => {
        console.error(err)
      })
  }, [])

  const handleChangeChatRoom = (e) => {
    if (e.target.nodeName === 'LI') { // If User element
      const userID = e.target.querySelector('div').id
      const username = e.target.querySelector('div').textContent

      setChatUsername(username)
      setChatUserID(userID)
    }
  }

  return (
    <div className='dashboard'>
      <div className="dashboard-header">

        <h1>Message App</h1>

      </div>
      <div className='dashboard-main-content'>
        {isSocketConnected ? <ChatRoomMenu handleChangeChatRoom={handleChangeChatRoom} /> : null}
        {isSocketConnected ? <ChatRoom chatUsername={chatUsername} chatUserID={chatUserID} /> : null}
        {isSocketConnected ? <User username={username} auth={auth} setAuth={setAuth} updateCsrfToken={updateCsrfToken} /> : null}
      </div>
    </div>
  )
}

export default Dashboard