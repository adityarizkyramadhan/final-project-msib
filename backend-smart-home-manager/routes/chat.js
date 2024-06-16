const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const chatController = require('../controllers/chat');
const chatValidation = require('../validations/chat');

router.post('/', chatValidation.create(), validate, chatController.create);
router.get('/', chatController.findAll);

const routeProps = {
  route: router,
  needAuth: true
}

module.exports = routeProps;
