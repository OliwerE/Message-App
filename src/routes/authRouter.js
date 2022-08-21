/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { AuthController } from '../controllers/authController.js'

export const router = express.Router()

const controller = new AuthController()

/*

ToDo: implement commented routes

*/

router.get('/', (req, res, next) => res.json({ message: 'Auth' }))
router.get('/check', (req, res, next) => controller.checkAuth(req, res, next))

// router.get('/username', authorizeRequest, controller.getUsername)

// router.get('/csurf', controller.getCsrfToken)

router.post('/login', (req, res, next) => controller.loginUser(req, res, next))
router.post('/register', (req, res, next) => controller.registerUser(req, res, next))
// router.post('/logout', authorizeRequest, controller.logout)

router.use('*', (req, res, next) => next(createError(404)))
