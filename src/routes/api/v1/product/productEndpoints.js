const express = require('express');
const getProductsController = require('../../../../controllers/api/v1/product/getProductsController');
const getProductByIdController = require('../../../../controllers/api/v1/product/getProductByIdController');
const { authenticateJwt } = require("../../../../middleware/auth");
const deleteProductController = require("../../../../controllers/api/v1/product/deleteProductController");
const { createProductValidator } = require("../../../../validators/product/createProductValidators");
const storeProductController = require("../../../../controllers/api/v1/product/storeProductController");
const multer = require('multer');
const { restoreProductValidator } = require("../../../../validators/product/restoreProductValidators");
const restoreProductController = require("../../../../controllers/api/v1/product/restoreProductController");
const upload = multer();
const router = express.Router();

router.get('/', getProductsController.getProducts);
router.get('/:id', getProductByIdController.getProductById);
router.post('/', upload.array('photos'), authenticateJwt, createProductValidator, storeProductController.storeProduct);
router.delete('/', authenticateJwt, deleteProductController.deleteProduct);
router.patch('/restore', authenticateJwt, restoreProductValidator, restoreProductController.restoreProduct);

module.exports = router;