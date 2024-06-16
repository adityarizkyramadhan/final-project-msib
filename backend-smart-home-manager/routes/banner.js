const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const bannerController = require('../controllers/banner');

router.get('/', validate, bannerController.findAll);

const routeProps = {
  route: router,
  needAuth: false
}

module.exports = routeProps;
