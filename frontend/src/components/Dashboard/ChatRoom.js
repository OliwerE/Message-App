import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'

const ChatRoom = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    socket.current.on('chat-room', message => {
      setMessages(messages => [...messages, { isSelf: false, message: message.msg, user: message.user }])
    })
  },[])

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
