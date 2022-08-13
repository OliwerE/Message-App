/**
 * Module represents Auth controller.
 */

import createError from 'http-errors'

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
      res.json({ isAuth: auth }) // change to auth!!
    } catch (err) {
      console.log(err)
      next(createError(500))
    }
  }
}
