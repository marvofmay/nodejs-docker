const express = require('express');
const getManufacturersController = require('../../../../controllers/api/v1/manufacturer/getManufacturersController');
//const getManufacturerByIdController = require('../../../../controllers/api/v1/product/getProductByIdController');

const router = express.Router();

router.get('/', getManufacturersController.getManufacturers);
//router.get('/:id', getManufacturerByIdController.getManufacturersById);

module.exports = router;