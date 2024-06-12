const express = require('express');
const getCategoriesController = require('../../../../controllers/api/v1/category/getCategoriesController');
const getCategoryByIdController = require('../../../../controllers/api/v1/category/getCategoryByIdController');

const router = express.Router();

router.get('/', getCategoriesController.getCategories);
router.get('/:id', getCategoryByIdController.getCategoryById);

module.exports = router;