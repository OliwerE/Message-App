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
  socket.current.on('users', connectedUsers => { // todo sort users
    const connectedUsersExceptSelf = connectedUsers.filter(user => user.userID !== socket.current.id)
    setUsers(users => [...users, ...connectedUsersExceptSelf])
  })
}

export function onUserConnected(users, setUsers) {
  socket.current.off('user connected')
  socket.current.on("user connected", (user) => { // todo sort users
    setUsers(users => [...users, user])
  })
}

export function onUserDisconnected(setUsers) {
  socket.current.off('user_disconnected')
  socket.current.on('user_disconnected', (disconnectedUser) => {
    setUsers(prevUsers => prevUsers.filter(user => user.userID !== disconnectedUser.userID))
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