const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const authController = require('../controllers/auth');
const authValidation = require('../validations/auth');

router.post('/register', authValidation.register(), validate, authController.register);
router.post('/login', authValidation.login(), validate, authController.login);

const routeProps = {
  route: router,
  needAuth: false
}

module.exports = routeProps;
