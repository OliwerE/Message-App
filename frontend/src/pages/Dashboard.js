import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

import ChatRoomMenu from '../components/Dashboard/ChatRoomMenu'
import ChatRoom from '../components/Dashboard/ChatRoom'
import Logout from '../components/Dashboard/Logout'

import { getUsername } from '../api/services/UserService'

const Dashboard = ({ auth, setAuth, updateCsrfToken }) => {
  const [username, setUsername] = useState('')
  const [isSocketConnected, setIsSocketConnected] = useState(false)
  // const [currentChatRoom, setCurrentChatRoom] = useState({ userID: undefined, username: undefined})
  const [chatUsername, setChatUsername] = useState('')
  const [chatUserID, setChatUserID] = useState('')

  // const chatUserID = useRef('')
  // const chatUsername = useRef('')

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
      <Logout auth={auth} setAuth={setAuth} updateCsrfToken={updateCsrfToken} />
      <div className="dashboard-header">
        <h1>Dashboard, Logged in user: {username}</h1>
      </div>
      <div className='dashboard-main-content'>
        {isSocketConnected ? <ChatRoomMenu socket={socket} handleChangeChatRoom={handleChangeChatRoom} /> : null}
        {isSocketConnected ? <ChatRoom socket={socket} chatUsername={chatUsername} chatUserID={chatUserID} /> : null}
      </div>
    </div>
  )
}

export default Dashboard