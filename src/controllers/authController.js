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

          res.status(200).json({ msg: 'User has been created.' })
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
}
