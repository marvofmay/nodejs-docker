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

const router = express.Router();

router.get('/create', manufacturerCreateController.manufacturerCreate);
router.post('/store', createManufacturerValidator, manufacturerStoreController.manufacturerStore);
router.get('/edit/:id', manufacturerEditController.manufacturerEdit);
router.put('/update', updateManufacturerValidator, manufacturerUpdateController.manufacturerUpdate);
router.post('/ajaxList', manufacturerAjaxListController.manufacturerAjaxList);
router.get('/info/:id', manufacturerInfoController.manufacturerInfo);
router.get('/', manufacturerIndexController.manufacturerIndex);
router.delete('/:id', manufacturerDeleteController.manufacturerDelete);

module.exports = router;