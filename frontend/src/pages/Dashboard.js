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

  const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  const [menuBtnText, setMenuBtnText] = useState('Open Menu')
  const [isMenu, setIsMenu] = useState(false)

  const handleResize = () => {
    setScreenWidth(window.innerWidth);

    if (window.innerWidth > 768) {
      document.querySelector('.chat-room-menu').style.display = 'block'
      document.querySelector('.user').style.display = 'block'
    } else {
      document.querySelector('.chat-room-menu').style.display = 'none'
      document.querySelector('.user').style.display = 'none'
    }
    setMenuBtnText('Open Menu')
    setIsMenu(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])

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

  const handleChangeChatRoom = (e) => { // ToDo refactor this function!!
    if (e.target.nodeName === 'LI') {
      const userID = e.target.querySelector('div').id
      const username = e.target.querySelector('div').textContent

      setChatUsername(username)
      setChatUserID(userID)
    } else if (e.target.nodeName === 'DIV') {
      const userID = e.target.getAttribute('id')
      const username = e.target.textContent

      setChatUsername(username)
      setChatUserID(userID)
    }  else if (e.target.nodeName === 'P') {
      const userID = e.target.parentNode.querySelector('div').getAttribute('id')
      const username = e.target.parentNode.querySelector('div').textContent

      setChatUsername(username)
      setChatUserID(userID)
    }

    if (isMenu) {
      document.querySelector('.chat-room-menu').style.display = 'none'
      document.querySelector('.user').style.display = 'none'
      setMenuBtnText('Open Menu')
      setIsMenu(false)
    }
  }

  const handleMenuClick = () => {
    console.log(isMenu)
    if (!isMenu) {
      document.querySelector('.chat-room-menu').style.display = 'block'
      document.querySelector('.user').style.display = 'block'
      setMenuBtnText('Close Menu')
      setIsMenu(true)
    } else {
      document.querySelector('.chat-room-menu').style.display = 'none'
      document.querySelector('.user').style.display = 'none'
      setMenuBtnText('Open Menu')
      setIsMenu(false)
    }
  }

  return (
    <div className='dashboard'>
      <div className="dashboard-header">
        <div className='menu-btn'>
          { screenWidth < 768 ? <button onClick={handleMenuClick}>{menuBtnText}</button> : null }
        </div>
        <div className='title'>
          <h1>Message App</h1>
        </div>
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