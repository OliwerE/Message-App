/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { router as apiRouter } from './apiRouter.js'

export const router = express.Router()

router.use('/', apiRouter)

router.use('*', (req, res, next) => next(createError(404)))
