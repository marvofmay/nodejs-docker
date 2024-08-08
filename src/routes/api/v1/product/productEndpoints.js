const express = require('express');
const getProductsController = require('../../../../controllers/api/v1/product/getProductsController');
const getProductByIdController = require('../../../../controllers/api/v1/product/getProductByIdController');
const { authenticateJwt } = require("../../../../middleware/auth");
const deleteProductController = require("../../../../controllers/api/v1/product/deleteProductController");
const {createProductValidator} = require("../../../../validators/product/createProductValidators");
const storeProductController = require("../../../../controllers/api/v1/product/storeProductController");

const router = express.Router();

router.get('/', getProductsController.getProducts);
router.get('/:id', getProductByIdController.getProductById);
router.post('/', authenticateJwt, createProductValidator, storeProductController.storeProduct);
router.delete('/', authenticateJwt, deleteProductController.deleteProduct);

module.exports = router;