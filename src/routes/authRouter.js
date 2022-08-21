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

/**
 * Check if user is logged in.
 *
 * @param {object} req - Request object.
 * @param {object} res - Response object.
 * @param {Function} next - Next function.
 */
const isLoggedIn = (req, res, next) => {
  if (req.session.user !== undefined) {
    next()
  } else {
    res.status(401).json({ msg: 'User not logged in.' })
  }
}

router.get('/', (req, res, next) => res.json({ message: 'Auth' }))
router.get('/check', (req, res, next) => controller.checkAuth(req, res, next))

router.post('/register', (req, res, next) => controller.registerUser(req, res, next))
router.post('/login', (req, res, next) => controller.loginUser(req, res, next))

router.get('/username', isLoggedIn, (req, res, next) => controller.getUsername(req, res, next))
// router.get('/csurf', controller.getCsrfToken)

router.post('/logout', isLoggedIn, (req, res, next) => controller.logout(req, res, next))

router.use('*', (req, res, next) => next(createError(404)))
