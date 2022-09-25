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
  const io = new Server(httpServer)
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
    // console.log(socket.request.session)
    socket.emit('chat-room', { msg: 'Welcome to Message App' })
    // setTimeout(() => {
    //   socket.emit('chat-room', { msg: 'Another message', status: 200 })
    // }, 2000)
    // setTimeout(() => {
    //   socket.emit('chat-room', { msg: 'THIRD', status: 200 })
    // }, 4000)

    socket.on('chat-room', message => {
      console.log(message)
      io.sockets.emit('chat-room', { msg: message, status: 200 }) // to all connected
      // socket.emit('chat-room', { msg: message, status: 200 }) // only to sender!
    })
  })
}
