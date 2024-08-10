import React, { createContext, useState, useEffect, useContext } from 'react';

import { socket, connectSocket, onPrivateMessage, onGetMessages } from '../api/socket'

const ChatContext = createContext();

export function ChatProvider({ children }) {
  // All chat messages
  const [messages, setMessages] = useState({})
  const [currentChatUserID, setCurrentChatUserID] = useState('')
  
  useEffect(() => {
    setMessages([])
    connectSocket()
    onPrivateMessage(setMessages)
  }, [])

  useEffect(() => {
    onGetMessages(currentChatUserID, setMessages)
  }, [currentChatUserID])


  const getMessages = (chatUserID) => {
    if (messages[chatUserID] !== undefined) return // If messages are cached in frontend

    // Store current chat userID
    setCurrentChatUserID(chatUserID)

    // Request old messages between two users
    socket.current.emit('get messages', {
      chatUserID
    })
  }

  const sendMessage = (chatUserID, textMessage) => {
    socket.current.emit('private message', { // Refactor/move to socket.js??
      content: textMessage,
      to: chatUserID,
    })

    setMessages(prevMessages => {
      let newValue
      if (prevMessages[chatUserID] !== undefined) {
        newValue = { [chatUserID]: [...prevMessages[chatUserID], { isSelf: true, message: textMessage }] }
      } else {
        newValue = { [chatUserID]: [{ isSelf: true, message: textMessage }] }
      }

      return {
        ...prevMessages,
        ...newValue
      }
    })
  }

  return (
    <ChatContext.Provider value={{ messages, sendMessage, getMessages }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useChat() {
  return useContext(ChatContext)
}