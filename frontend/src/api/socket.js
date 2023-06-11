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

export function onPrivateMessage(chatUserID, chatUsername, setMessages) {
  socket.current.off('private message')
  socket.current.on('private message', ({ content, from }) => {
    if (chatUserID === from) {
      setMessages(messages => [...messages, { isSelf: false, message: content, user: chatUsername }])
    }
  })
}