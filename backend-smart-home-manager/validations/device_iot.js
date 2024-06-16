const { body, header, param, query } = require('express-validator');

const library = {}
module.exports = library

library.create = () => [
  body('id').isString().notEmpty().withMessage('ID harus merupakan string dan tidak boleh kosong'),
  body('name').isString().notEmpty().withMessage('Nama harus merupakan string dan tidak boleh kosong'),
  body('jenis_perangkat').isString().notEmpty().withMessage('Jenis perangkat harus merupakan string dan tidak boleh kosong'),
  body('daya_listrik').isInt({ min: 0 }).withMessage('Daya listrik harus merupakan bilangan bulat positif'),
  body('ruangan').isString().notEmpty().withMessage('Ruangan harus merupakan string dan tidak boleh kosong'),
  body('mode').isString().notEmpty().withMessage('Mode harus merupakan string dan tidak boleh kosong'),
]

library.findByID = () => [
  param('id').isString().notEmpty().withMessage('ID harus merupakan string dan tidak boleh kosong'),
]

library.findAll = () => []

library.ubahStatus = () => [
  query('id').isString().notEmpty().withMessage('ID harus merupakan string dan tidak boleh kosong'),
  query('status').exists().isBoolean().toBoolean().withMessage('Status harus merupakan boolean'),
]
