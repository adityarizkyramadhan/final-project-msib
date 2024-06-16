const express = require('express');
const router = express.Router();
const validate = require('../utils/validate');
const deviceIotController = require('../controllers/device_iot');
const deviceIotValidation = require('../validations/device_iot');

router.get('/', deviceIotValidation.findAll(), validate, deviceIotController.findAll);
router.get('/iot', validate, deviceIotController.findAllIoT);
router.post('/', deviceIotValidation.create(), validate, deviceIotController.create);
router.post('/iot', validate, deviceIotController.createIoT);
router.get('/iot/:id', validate, deviceIotController.findByIdIoT);
router.get('/:id', deviceIotValidation.findByID(), validate, deviceIotController.findById);
router.put('/fcm-token/:id', validate, deviceIotController.update);
router.put('/status', deviceIotValidation.ubahStatus(), validate, deviceIotController.ubahStatus);


const routeProps = {
  route: router,
  needAuth: true
}

module.exports = routeProps;

