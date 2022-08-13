/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { router as apiRouter } from './apiRouter.js'
import { router as authRouter } from './authRouter.js'

export const router = express.Router()

router.use('/auth', authRouter)
router.use('/', apiRouter)

router.use('*', (req, res, next) => next(createError(404)))
