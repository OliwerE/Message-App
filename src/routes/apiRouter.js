/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { ApiController } from '../controllers/apiController.js'

export const router = express.Router()

const controller = new ApiController()

router.get('/get', (req, res, next) => controller.getTest(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
