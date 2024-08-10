import { io } from 'socket.io-client'

const socketUrl = process.env.REACT_APP_WEBSOCKET_URL

export let socket = {}

export function connectSocket() {
  socket.current = io(socketUrl, { // use option 2 instead?: https://stackoverflow.com/questions/73007362/socket-io-origin-set-but-anyways-getting-errors
    transports: ["websocket"], // Bypass cors
    path: '/socket/'
  })
}

export function onUsers(setUsers) {
  socket.current.off('users')
  socket.current.on('users', connectedUsers => {
    setUsers(() => [...connectedUsers])
  })
}

export function onUserConnected(users, setUsers) {
  socket.current.off('user connected')
  socket.current.on("user connected", (user) => {
    setUsers(users => {

      const updatedUsers = [...users]
      // Update connected user status to online
      let hasUpdatedUser = false
      for (let i = 0; i < updatedUsers.length; i++) {
        if (updatedUsers[i].userID === user.userID) {
          updatedUsers[i].connected = true
          hasUpdatedUser = true
        }
      }

      if (!hasUpdatedUser) {
        return [...users, user]
      }
      return updatedUsers
    })
  })
}

export function onUserDisconnected(setUsers) {
  socket.current.off('user_disconnected')
  socket.current.on('user_disconnected', (disconnectedUser) => {
    setUsers(prevUsers => {

      const users = [...prevUsers]
      // Update connected user status to offline
      for (let i = 0; i < users.length; i++) {
        if (users[i].userID === disconnectedUser.userID) {
          users[i].connected = false
        }
      }
      return users
    })
  })
}

export function onPrivateMessage(setMessages) {
  socket.current.off('private message');
  socket.current.on('private message', ({ content, from }) => {
    setMessages(prevMessages => {
      let newValue
      if (prevMessages[from] !== undefined) {
        newValue = { [from]: [...prevMessages[from], { isSelf: false, message: content }] }
      } else {
        newValue = { [from]: [{ isSelf: false, message: content }] }
      }

      return {
        ...prevMessages,
        ...newValue
      }
    })
  })
}

export function onGetMessages(currentChatUserID, setMessages) {
  socket.current.off('get messages')
  socket.current.on('get messages', ({ messages }) => {
    // Add messages to frontend

    for (let i = 0; i < messages.length; i++) {
      // Is self or message from other user
      let isSelf
      if (messages[i].from === currentChatUserID) {
        isSelf = false
      } else {
        isSelf = true
      }

      const message = {
        isSelf,
        message: messages[i].message
      }

      setMessages(prevMessages => {
        let newValue
        if (prevMessages[currentChatUserID] !== undefined) {
          newValue = { [currentChatUserID]: [...prevMessages[currentChatUserID], message] }
        } else {
          newValue = { [currentChatUserID]: [message] }
        }

        return {
          ...prevMessages,
          ...newValue
        }
      })
    }
  })
}