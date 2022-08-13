/**
 * Module represents API controller.
 */

import createError from 'http-errors'

/**
 * Class represents API controller.
 */
export class ApiController {
  getTest (req, res, next) {
    try {
      res.json({ msg: 'Hello World from backend!' })
    } catch (err) {
      next(createError(500))
    }
  }
}
