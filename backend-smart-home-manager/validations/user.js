const { body, header, param } = require('express-validator');

const library = {}
module.exports = library

library.getOne = function () {
  return [
    header('Authorization')
      .exists().withMessage('Authorization is required')
      .isJWT().withMessage('Authorization must be JWT'),
  ]
}
