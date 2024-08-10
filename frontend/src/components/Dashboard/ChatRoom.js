import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'

import { useChat } from '../../contexts/ChatContext';

const ChatRoom = ({ chatUsername, chatUserID }) => {
  const { messages, sendMessage, getMessages } = useChat()
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    if (chatUserID !== '') { // Shouldn't try to call when page is loading!
      getMessages(chatUserID)
    }
  }, [chatUserID])


  const handleMessageSubmit = (e) => {
    e.preventDefault()

    if (textMessage.length < 1) return

    sendMessage(chatUserID, textMessage)
    
    setTextMessage('')
  }

  const chatRoom = (
    <>
      <div className="room-header">
        <h1>{chatUsername}</h1>
      </div>
      <div className="message-container">
        <ChatMessages messages={messages[chatUserID]} chatUsername={chatUsername} />
      </div>
      <div className="room-input-menu">
        <form onSubmit={handleMessageSubmit}>
          <input className="message-input" name='message' type="text" autoComplete="off" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder="Message..."  />
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
