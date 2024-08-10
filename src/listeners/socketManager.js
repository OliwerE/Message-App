import { Server } from 'socket.io'

import { wrap } from './socketMiddlewareWrapper.js'
import { SocketController } from './socketController.js'

const socketController = new SocketController()

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
  io.use(socketController.authMiddleware)
  io.on('connection', socketController.handleConnection)
}
