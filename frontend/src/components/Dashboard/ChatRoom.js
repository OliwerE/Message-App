import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'

const ChatRoom = ({ socket, chatUsername, chatUserID }) => {
  const [messages, setMessages] = useState([])
  const [textMessage, setTextMessage] = useState('')

  useEffect(() => {
    socket.current.off('private message') // disable current private message
    setMessages([])
    
    // socket.current.on('chat-room', message => {
    //   setMessages(messages => [...messages, { isSelf: false, message: message.msg, user: message.user }])
    // })

    socket.current.on('private message', ({ content, from }) => {
      // console.log(content)
      // console.log('from: ' + from)
      // console.log('chatuserid: ' + chatUserID)
      if (chatUserID === from) {
        setMessages(messages => [...messages, { isSelf: false, message: content, user: chatUsername }])
      }
    })

  },[chatUsername, chatUserID, socket]) // [chatUsername, chatUserID, socket] // körs alltid 2 ggr pga chatusername och chatuserid

  const handleMessageSubmit = (e) => {
    e.preventDefault()

    setMessages(messages => [...messages, { isSelf: true, message: textMessage }])

    // socket.current.emit('chat-room', textMessage) // public
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
          <input className="message-input" name='message' type="text" value={textMessage} onChange={e => setTextMessage(e.target.value)} placeholder="Message..."  />
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
