const express = require('express');
const getProductsController = require('../../../../controllers/api/v1/product/getProductsController');
//const getProductByIdController = require('../../../../controllers/api/v1/product/getProductByIdController');

const router = express.Router();

router.get('/', getProductsController.getProducts);
//router.get('/:id', getProductByIdController.getProductById);

module.exports = router;