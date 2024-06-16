const { body, header, param } = require('express-validator');

const library = {}
module.exports = library

library.create = () => {
  return [
    body('daya')
      .exists().withMessage('daya is required')
      .isString().withMessage('daya must be a string'),
    body('jenis_pembayaran')
      .exists().withMessage('jenis_pembayaran is required')
      .isString().withMessage('jenis_pembayaran must be a string'),
    body('perangkat_listrik')
      .exists().withMessage('perangkat_listrik is required')
      .isArray().withMessage('perangkat_listrik must be an array'),
    body('perangkat_listrik.*.jenis_perangkat')
      .exists().withMessage('jenis_perangkat is required')
      .isString().withMessage('jenis_perangkat must be a string'),
    body('perangkat_listrik.*.jumlah')
      .exists().withMessage("jumlah perangkat listrik is required")
      .isInt().withMessage("jumlah perangkat listrik must be an integer"),
    body('perangkat_listrik.*.daya_listrik')
      .exists().withMessage("daya listrik is required")
      .isInt().withMessage("daya listrik must be an integer"),
    body('perangkat_listrik.*.lama_pemakaian')
      .exists().withMessage("lama pemakaian is required")
      .isInt().withMessage("lama pemakaian must be an integer")
  ]
}
