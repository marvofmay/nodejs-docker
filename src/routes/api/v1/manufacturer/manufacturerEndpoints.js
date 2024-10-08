const express = require('express');
const getManufacturersController = require('../../../../controllers/api/v1/manufacturer/getManufacturersController');
const getManufacturerByIdController = require('../../../../controllers/api/v1/manufacturer/getManufacturerByIdController');
const storeManufacturerController = require('../../../../controllers/api/v1/manufacturer/storeManufacturerController');
const { createManufacturerValidator } = require('../../../../validators/manufacturer/createManufacturerValidators');
const { authenticateJwt } = require('../../../../middleware/auth');
const deleteManufacturerController = require('../../../../controllers/api/v1/manufacturer/deleteManufacturerController');
const { restoreManufacturerValidator } = require("../../../../validators/manufacturer/restoreManufacturerValidators");
const restoreManufacturerController = require("../../../../controllers/api/v1/manufacturer/restoreManufacturerController");

const router = express.Router();

router.get('/', getManufacturersController.getManufacturers);
router.get('/:id', getManufacturerByIdController.getManufacturerById);
router.post('/', authenticateJwt, createManufacturerValidator, storeManufacturerController.storeManufacturer);
router.delete('/', authenticateJwt, deleteManufacturerController.deleteManufacturer);
router.patch('/restore', authenticateJwt, restoreManufacturerValidator, restoreManufacturerController.restoreManufacturer);

module.exports = router;