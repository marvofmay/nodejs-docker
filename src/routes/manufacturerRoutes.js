const express = require('express');
const manufacturerCreateController = require('../controllers/manufacturer/manufacturerCreateController');
const manufacturerStoreController = require('../controllers/manufacturer/manufacturerStoreController');
const manufacturerIndexController = require('../controllers/manufacturer/manufacturerIndexController');
const manufacturerEditController = require('../controllers/manufacturer/manufacturerEditController');
const manufacturerUpdateController = require('../controllers/manufacturer/manufacturerUpdateController');
const manufacturerAjaxListController = require('../controllers/manufacturer/manufacturerAjaxListController');
const manufacturerInfoController = require('../controllers/manufacturer/manufacturerInfoController');
const { createManufacturerValidator } = require('../validators/manufacturer/createManufacturerValidators');
const { updateManufacturerValidator} = require("../validators/manufacturer/updateManufacturerValidators");
const manufacturerDeleteController = require("../controllers/manufacturer/manufacturerDeleteController");
const manufacturerRestoreController = require("../controllers/manufacturer/manufacturerRestoreController");
const manufacturerPDFController = require("../controllers/manufacturer/manufacturerPDFController");

const router = express.Router();

router.get('/create', manufacturerCreateController.manufacturerCreate);
router.get('/pdf/:id', manufacturerPDFController.manufacturerPDF);
router.post('/store', createManufacturerValidator, manufacturerStoreController.manufacturerStore);
router.get('/edit/:id', manufacturerEditController.manufacturerEdit);
router.post('/ajaxList', manufacturerAjaxListController.manufacturerAjaxList);
router.get('/info/:id', manufacturerInfoController.manufacturerInfo);
router.get('/', manufacturerIndexController.manufacturerIndex);
router.put('/:id', updateManufacturerValidator, manufacturerUpdateController.manufacturerUpdate);
router.delete('/:id', manufacturerDeleteController.manufacturerDelete);
router.patch('/:id/restore', manufacturerRestoreController.manufacturerRestore);

module.exports = router;