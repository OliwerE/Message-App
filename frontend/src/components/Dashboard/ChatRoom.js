import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'

import { socket, onPrivateMessage } from '../../api/socket'

const ChatRoom = ({ chatUsername, chatUserID }) => {
  const [messages, setMessages] = useState([])
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    setMessages([])
    onPrivateMessage(chatUserID, chatUsername, setMessages)
  },[chatUsername, chatUserID])

  const handleMessageSubmit = (e) => {
    e.preventDefault()

    if (textMessage.length < 1) return

    setMessages(messages => [...messages, { isSelf: true, message: textMessage }])

    socket.current.emit('private message', {
      content: textMessage,
      to: chatUserID,
    })
    
    setTextMessage('')
  }

  const chatRoom = (
    <>
      <div className="room-header">
        <h1>{chatUsername}</h1>
      </div>
      <div className="message-container">
        <ChatMessages messages={messages} />
      </div>
      <div className="room-input-menu">
        <form onSubmit={handleMessageSubmit}>
          <input className="message-input" name='message' type="text" autocomplete="off" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder="Message..."  />
          <input className="send-btn" type="submit" value="Send" />
        </form>
      </div>
    </>
  )

  return (
    <div className="chat-room">
      {chatUserID === '' || chatUsername === '' ? <p>Select user</p> : chatRoom}
    </div>
  )
}

export default ChatRoom
