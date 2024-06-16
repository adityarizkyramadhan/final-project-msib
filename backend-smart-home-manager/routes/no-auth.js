const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const deviceIotController = require('../controllers/device_iot');

router.get('/', validate, deviceIotController.findAll);

const routeProps = {
  route: router,
  needAuth: false
}

module.exports = routeProps;
