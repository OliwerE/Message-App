/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { AuthController } from '../controllers/authController.js'

export const router = express.Router()

const controller = new AuthController()

router.get('/', (req, res, next) => controller.checkAuth(req, res, next))
// router.post('/login', (req, res, next) => controller.login(req, res, next))
// router.post('/register', (req, res, next) => controller.register(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
