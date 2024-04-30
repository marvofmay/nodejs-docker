const express = require('express');
const productCreateController = require('../controllers/product/productCreateController');
const productIndexController = require('../controllers/product/productIndexController');
const productStoreController = require('../controllers/product/productStoreController');
const productInfoController = require('../controllers/product/productInfoController');
const productUpdateController = require('../controllers/product/productUpdateController');
const productEditController = require('../controllers/product/productEditController');
const { createProductValidator } = require('../validators/product/createProductValidators');
const { updateProductValidator } = require('../validators/product/updateProductValidators')
const multer = require('multer');
const upload = multer();

const router = express.Router();

router.get('/create', productCreateController.productCreate);
router.get('/info/:id', productInfoController.productInfo);
router.get('/edit/:id', productEditController.productEdit);
router.get('/', productIndexController.productIndex);
router.post('/store', upload.array('photos'), createProductValidator, productStoreController.productStore);
router.put('/:id', upload.array('photos'), updateProductValidator, productUpdateController.productUpdate);

module.exports = router;