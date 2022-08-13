import express from 'express'
import helmet from 'helmet'
import logger from 'morgan'
import cors from 'cors'
import { connectDB } from './config/mongoose.js'
import { router } from './routes/router.js'
// import path from 'path'

/**
 * Express server configuration.
 */
async function run () {
  const app = express()
  app.use(helmet())
  app.set('trust proxy', 1)
  app.use(cors({ origin: process.env.ORIGIN, credentials: true }))
  app.use(logger('dev'))
  app.use(express.json())

  // MongoDB
  await connectDB(app)

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

  app.listen(process.env.PORT, () => {
    console.log(`Listens for localhost@${process.env.PORT}`)
    console.log('ctrl + c to terminate')
  })
}
run()
