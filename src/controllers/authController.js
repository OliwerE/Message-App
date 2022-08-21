/**
 * Module represents Auth controller.
 */

import bcrypt from 'bcrypt'
import createError from 'http-errors'

import { User } from '../models/User.js'

/**
 * Class represents Auth controller.
 */
export class AuthController {
  /**
   * Check if user is logged in.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   */
  checkAuth (req, res, next) {
    try {
      let auth
      if (req.session.user !== undefined) {
        auth = true
      } else {
        auth = false
      }
      res.json({ isAuth: auth })
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }

  /**
   * Create a new user.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {JSON} - Response data.
   */
  async registerUser (req, res, next) {
    try {
      const { username, password } = req.body

      if (username.trim().length > 0 && password.trim().length > 0) {
        if (username.trim().length > 1000 || password.trim().length > 1000) {
          return res.status(400).json({ msg: 'Username and/or password is too long. Max length: 1000' })
        }

        const isUniqueUsername = await User.find({ username })

        if (isUniqueUsername.length === 0) {
          const newUser = new User({
            username,
            password: await bcrypt.hash(password, 8)
          })

          await newUser.save()

          return res.status(200).json({ msg: 'User has been created.' })
        } else {
          return res.status(409).json({ msg: 'Username already exist. Choose another username.' })
        }
      } else {
        return res.status(400).json({ msg: 'Username and/or password is too short. Min length: 1' })
      }
    } catch (err) {
      next(createError(500))
    }
  }

  /**
   * Login user.
   *
   * @param {object} req - Request object.
   * @param {object} res - Response object.
   * @param {Function} next - Next function.
   * @returns {JSON} - Response data.
   */
  async loginUser (req, res, next) {
    try {
      const { username, password } = req.body
      if (username.trim().length > 1000 || password.trim().length > 1000) {
        return res.status(400).json({ msg: 'Username and/or password is too long. Max length: 1000' })
      }

      const user = await User.find({ username })

      if (user.length === 1 && user[0].username === username) {
        const isCorrectPassword = await bcrypt.compare(password, user[0].password)

        if (isCorrectPassword) {
          req.session.user = username
          return res.status(200).json({ msg: 'User logged in.' })
        } else {
          return res.status(401).json({ msg: 'Invalid credentials' })
        }
      } else {
        return res.status(401).json({ msg: 'Invalid credentials' })
      }
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }

  /**
   * Returns username of current user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - Next function.
   * @returns {JSON} - Response data.
   */
  getUsername (req, res, next) {
    try {
      return res.json({ username: req.session.user })
    } catch (err) {
      next(createError(500))
    }
  }

  /**
   * Logout user.
   *
   * @param {object} req - The request object.
   * @param {object} res - The response object.
   * @param {Function} next - Next function.
   * @returns {JSON} - Response data.
   */
  logout (req, res, next) {
    try {
      req.session.destroy()
      return res.clearCookie(process.env.SESSION_NAME).json({ msg: 'User has been logged out' })
    } catch (err) {
      next(createError(500))
    }
  }
}
