/**
 * Module represents Mongoose configuration module.
 */

import mongoose from 'mongoose'
import session from 'express-session'
import MongoStore from 'connect-mongo'

/**
 * Represents the mongoose configuration used for the connection to mongoDB.
 *
 * @param {object} app - The express application.
 */
export const connectDB = async (app) => {
  mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected.')
  })
  mongoose.connection.on('error', (error) => {
    console.log(`A mongoose connection error has occured: ${error}`)
  })
  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected.')
  })

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log('Mongoose is disconnected because of application termination.')
      process.exit(0)
    })
  })

  await mongoose.connect(process.env.DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  // const MongoDBSessionStore = MongoStore(session)

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
    store: MongoStore.create({ mongoUrl: process.env.DB_CONNECTION_STRING })
  }

  // Production session options
  if (app.get('env') === 'production') {
    // sessionOptions.cookie.domain = process.env.DOMAIN
    sessionOptions.cookie.secure = true
  }

  app.use(session(sessionOptions))
}
