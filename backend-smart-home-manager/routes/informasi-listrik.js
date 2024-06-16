const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const informasiListrikValidation = require('../validations/informasi_listrik');
const informasiListrikController = require('../controllers/informasi_listrik');

router.post('/', informasiListrikValidation.create(), validate, informasiListrikController.create);
router.get('/check-is-complete', validate, informasiListrikController.checkIsComplete);

const routeProps = {
  route: router,
  needAuth: true
}

module.exports = routeProps;
