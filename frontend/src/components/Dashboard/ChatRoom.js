import React, { useEffect, useState } from 'react'
import ChatMessages from './ChatMessages'
import { io } from 'socket.io-client'

const ChatRoom = () => {
  const [messages, setMessages] = useState([{
    isYou: true, 
    message: 'Hej!'
  },{
    isYou: false, 
    message: 'Hallå!!!'
  }])

  // const devMsg = [{
  //   isYou: true, 
  //   message: 'Hej!'
  // },{
  //   isYou: false, 
  //   message: 'Hallå!!!'
  // }]

  useEffect(() => {
    const socket = io('ws://localhost:5001', { // use option 2 instead?: https://stackoverflow.com/questions/73007362/socket-io-origin-set-but-anyways-getting-errors
      transports: ["websocket"] // Bypass cors
    })

    socket.on('chat-room', message => {
      console.log(message)
      console.log(messages)

      // Bug only first message shown
      const messageArr = [...messages]
      messageArr.push({ isYou: false, message: message.msg })
      console.log(messageArr)

      setMessages(messageArr)
    })
  }, [])

  return (
    <div className="chat-room">
      <div className="room-header">
        <h1>Anders</h1>
      </div>
      <div className="message-container">
        <ChatMessages messages={messages} />
      </div>
      <div className="room-input-menu">
        <form>
          <input className="message-input" type="text" placeholder="Message..."  />
          <input className="send-btn" type="button" value="Send" />
        </form>
      </div>
    </div>
  )
}

export default ChatRoom
