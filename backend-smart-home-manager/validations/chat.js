const { body, header, param } = require('express-validator');

const library = {}
module.exports = library

library.create = () => [
  body('prompt')
    .exists().withMessage('prompt is required')
    .isLength({ min: 1 }).withMessage('prompt must be at least 1 chars long')
    .isLength({ max: 255 }).withMessage('prompt must be at most 255 chars long'),
]
