/**
 * Default Router.
 */
import express from 'express'
import createError from 'http-errors'
import { AuthController } from '../controllers/authController.js'

export const router = express.Router()

const controller = new AuthController()

router.get('/', (req, res, next) => res.json({ message: 'Auth' }))

/*

ToDo: implement commented routes

*/

// router.get('/username', authorizeRequest, controller.getUsername)

// router.get('/csurf', controller.getCsrfToken)

// router.post('/login', controller.postLogin)
router.post('/register', (req, res, next) => controller.registerUser(req, res, next))
// router.post('/logout', authorizeRequest, controller.logout)

// router.get('/profile', authorizeRequest, controller.getUserProfile)
// router.post('/profile', authorizeRequest, controller.postUpdateProfile)

router.get('/check', (req, res, next) => controller.checkAuth(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
