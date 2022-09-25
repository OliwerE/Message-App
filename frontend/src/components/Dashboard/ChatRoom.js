import React, { useEffect, useRef, useState } from 'react'
import ChatMessages from './ChatMessages'
import { io } from 'socket.io-client'

let socket

const ChatRoom = () => {
  const [messages, setMessages] = useState([])
  const [textMessage, setTextMessage] = useState('')

  const socketUrl = process.env.REACT_APP_WEBSOCKET_URL
  let socket = useRef(null)
  

  useEffect(() => {
    socket.current = io(socketUrl, { // use option 2 instead?: https://stackoverflow.com/questions/73007362/socket-io-origin-set-but-anyways-getting-errors
      transports: ["websocket"], // Bypass cors
      path: '/socket/'
    })

    // socket.current.emit('chat-room', 'hello from client')

    socket.current.on('chat-room', message => {
      setMessages(messages => [...messages, { isSelf: false, message: message.msg, user: message.user }])
    })
  },[socketUrl])

  const handleMessageSubmit = (e) => {
    e.preventDefault()

    setMessages(messages => [...messages, { isSelf: true, message: textMessage }])

    socket.current.emit('chat-room', textMessage)
    
    setTextMessage('')
  }

  return (
    <div className="chat-room">
      <div className="room-header">
        <h1>Public chat room</h1>
      </div>
      <div className="message-container">
        <ChatMessages messages={messages} />
      </div>
      <div className="room-input-menu">
        <form onSubmit={handleMessageSubmit}>
          <input className="message-input" name='message' type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder="Message..."  />
          <input className="send-btn" type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
