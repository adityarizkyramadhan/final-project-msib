const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const ruanganController = require('../controllers/ruangan');

router.get('/', validate, ruanganController.findAll);

const routeProps = {
  route: router,
  needAuth: true
}

module.exports = routeProps;
