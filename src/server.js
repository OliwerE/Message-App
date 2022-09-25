import express from 'express'
import session from 'express-session'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongoose.js'
import { mongoStore } from './config/mongoStore.js'
import { router } from './routes/router.js'
import csurf from 'csurf'

import { sockets } from './listeners/socketManager.js'

/**
 * Express server configuration.
 */
async function run () {
  const app = express()

  // MongoDB
  await connectDB(app) // temp solution!

  // Configure Express session
  const sessionOptions = {
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 24h
      sameSite: 'lax'
    },
    store: mongoStore
  }

  // Production session options
  if (app.get('env') === 'production') {
    // sessionOptions.cookie.domain = process.env.DOMAIN
    sessionOptions.cookie.secure = true
  }

  const sessionMiddleware = session(sessionOptions)

  app.use(sessionMiddleware)
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

  sockets.init(httpServer, sessionMiddleware) // don't like this way of including sessionMiddleware, see why in mongoconfig!
}
run()
