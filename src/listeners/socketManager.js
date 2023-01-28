import { Server } from 'socket.io'

import { wrap } from './socketMiddlewareWrapper.js'

export const sockets = {}

/**
 * Initializes websocket server.
 *
 * @param {object} httpServer - Http server.
 * @param {object} sessionMiddleware - Express session.
 */
sockets.init = function (httpServer, sessionMiddleware) {
  const io = new Server(httpServer, {
    path: '/socket/'
  })
  io.use(wrap(sessionMiddleware))

  // only allow authenticated users
  io.use((socket, next) => {
    // console.log('test')
    const session = socket.request.session
    // console.log(session)
    if (session && session.user) { // used to be: (session && session.authenticated)
      next()
    } else {
      console.log('user not auth, socket access denied')
      next(new Error('unauthorized')) // Not returning error???
    }
  })

  io.on('connection', (socket) => {
    const users = []
    for (const [id, socket] of io.of('/').sockets) { // Only getting users of current server, not good for scaling!!
      users.push({
        userID: id,
        username: socket.request.session.user
      })
    }
    // console.log(users)
    // socket.emit('chat-room', { msg: 'Welcome to Message App', user: 'Server' }) // fix: don't allow Server as username!
    socket.emit('users', users) // Connected users

    // Add user to all clients except itself
    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.request.session.user
    })

    /*
    socket.on('chat-room', message => { // public chat
      console.log(message)
      console.log(socket.request.session.user)
      // io.sockets.emit('chat-room', { msg: message, status: 200 }) // to all connected
      socket.broadcast.emit('chat-room', { msg: message, user: socket.request.session.user }) // all except sender
      // socket.emit('chat-room', { msg: message, status: 200 }) // only to sender!
    })
    */

    socket.on('private message', ({ content, to }) => {
      // console.log(content)
      // console.log(to)
      socket.to(to).emit('private message', {
        content,
        from: socket.id
      })
    })

    socket.on('disconnect', () => {
      io.emit('user_disconnected', { userID: socket.id })
    })
  })
}
