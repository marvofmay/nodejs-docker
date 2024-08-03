const express = require('express');
const getManufacturersController = require('../../../../controllers/api/v1/manufacturer/getManufacturersController');
const getManufacturerByIdController = require('../../../../controllers/api/v1/manufacturer/getManufacturerByIdController');
const storeManufacturerController = require('../../../../controllers/api/v1/manufacturer/storeManufacturerController');
const { createManufacturerValidator } = require('../../../../validators/manufacturer/createManufacturerValidators');
const { authenticateJwt } = require('../../../../middleware/auth');

const router = express.Router();

router.get('/', getManufacturersController.getManufacturers);
router.get('/:id', getManufacturerByIdController.getManufacturerById);
router.post('/', authenticateJwt, createManufacturerValidator, storeManufacturerController.storeManufacturer);

module.exports = router;