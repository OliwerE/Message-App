import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongoose.js'
import { router } from './routes/router.js'
import csurf from 'csurf'
// import path from 'path'

import { Server } from 'socket.io'

/**
 * Express server configuration.
 */
async function run () {
  const app = express()

  // MongoDB
  const sessionMiddleware = await connectDB(app) // temp solution!

  app.use(helmet())
  app.set('trust proxy', 1)
  app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
  app.use(logger('dev'))
  app.use(express.json())
  app.use(csurf({}))

  // Csurf error handling
  app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err)
    res.status(403).json({ reason: 'csrfToken-invalid' })
  })

  app.use((req, res, next) => {
    res.set('Cache-control', 'no-cache')
    next()
  })

  app.use('/api', router)

  app.use((err, req, res, next) => {
    // if (err.status === 404) {
    //   return res.status(404).sendFile(join(fullDirName, 'views', 'errors', '404.html'))
    // }

    return res.json({ msg: ('Error: ' + err.status) })
  })

  const httpServer = app.listen(process.env.PORT, () => {
    console.log(`Listens for localhost@${process.env.PORT}`)
    console.log('ctrl + c to terminate')
  })

  const io = new Server(httpServer)

  /**
   * Socket.io middleware wrapper.
   *
   * @param {object} middleware - Middleware object
   * @returns {object} - Middleware
   */
  const wrap = middleware => (socket, next) => middleware(socket.request, {}, next) // convert a connect middleware to a Socket.IO middleware

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
    socket.emit('chat-room', { msg: 'Hello from backend', status: 200 })
    setTimeout(() => {
      socket.emit('chat-room', { msg: 'Another message', status: 200 })
    }, 2000)
  })
}
run()
