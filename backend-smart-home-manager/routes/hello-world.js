const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const { success } = require('../utils/http_res');

router.get('/', validate, async (req, res, next) => {
  try {
    return success(res, 200, { message: 'Hello World' });
  } catch (err) {
    return next(err);
  }
});

const routeProps = {
  route: router,
  needAuth: false
}

module.exports = routeProps;
