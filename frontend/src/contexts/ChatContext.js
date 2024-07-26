import React, { createContext, useState, useEffect, useContext } from 'react';

import { socket, connectSocket, onPrivateMessage } from '../api/socket'

const ChatContext = createContext();

export function ChatProvider({ children }) {
  // All chat messages
  const [messages, setMessages] = useState({})
  
  useEffect(() => {
    setMessages([])
    connectSocket()
    onPrivateMessage(setMessages)
  }, [])

  const sendMessage = (chatUserID, textMessage) => {
    socket.current.emit('private message', {
      content: textMessage,
      to: chatUserID,
    })

    setMessages(prevMessages => {
      let newValue
      if (prevMessages[chatUserID] !== undefined) {
        console.log('not undefined')
        newValue = { [chatUserID]: [...prevMessages[chatUserID], { isSelf: true, message: textMessage }] }
      } else {
        console.log('is undefined')
        newValue = { [chatUserID]: [{ isSelf: true, message: textMessage }] }
      }

      return {
        ...prevMessages,
        ...newValue
      }
    })
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}