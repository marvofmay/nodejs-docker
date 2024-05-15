const express = require('express');
const productCreateController = require('../controllers/product/productCreateController');
const productIndexController = require('../controllers/product/productIndexController');
const productStoreController = require('../controllers/product/productStoreController');
const productInfoController = require('../controllers/product/productInfoController');
const productUpdateController = require('../controllers/product/productUpdateController');
const productEditController = require('../controllers/product/productEditController');
const productAjaxListController = require('../controllers/product/productAjaxListController');
const { createProductValidator } = require('../validators/product/createProductValidators');
const { updateProductValidator } = require('../validators/product/updateProductValidators')
const multer = require('multer');
const productDeleteController = require("../controllers/product/productDeleteController");
const upload = multer();

const router = express.Router();

router.get('/create', productCreateController.productCreate);
router.get('/info/:id', productInfoController.productInfo);
router.get('/edit/:id', productEditController.productEdit);
router.get('/', productIndexController.productIndex);
router.post('/ajaxList', productAjaxListController.productAjaxList);
router.post('/store', upload.array('photos'), createProductValidator, productStoreController.productStore);
router.put('/:id', upload.array('photos'), updateProductValidator, productUpdateController.productUpdate);
router.delete('/:id', productDeleteController.productDelete);

module.exports = router;