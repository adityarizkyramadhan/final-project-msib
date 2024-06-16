const { body, header, param } = require('express-validator');

const library = {}
module.exports = library

library.register = function () {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isEmail().withMessage('email is not valid')
      .isLength({ max: 255 }).withMessage('email must be at most 255 chars long'),
    body('password')
      .exists().withMessage('password is required')
      .isLength({ min: 8 }).withMessage('password must be at least 8 chars long')
      .isLength({ max: 255 }).withMessage('password must be at most 255 chars long'),
    body('complete_name')
      .exists().withMessage('complete_name is required')
      .isLength({ min: 8 }).withMessage('complete_name must be at least 8 chars long')
      .isLength({ max: 255 }).withMessage('complete_name must be at most 255 chars long'),
  ]
}

library.login = function () {
  return [
    body('email')
      .exists().withMessage('email is required')
      .isEmail().withMessage('email is not valid'),
    body('password')
      .exists().withMessage('password is required')
      .isLength({ min: 8 }).withMessage('password must be at least 8 chars long')
      .isLength({ max: 255 }).withMessage('password must be at most 255 chars long'),
  ]
}
