const express = require('express');
const getCategoriesController = require('../../../../controllers/api/v1/category/getCategoriesController');
const getCategoryByIdController = require('../../../../controllers/api/v1/category/getCategoryByIdController');
const storeCategoryController = require('../../../../controllers/api/v1/category/storeCategoryController');
const { createCategoryValidator } = require('../../../../validators/category/createCategoryValidators');
const { authenticateJwt } = require('../../../../middleware/auth');

const router = express.Router();

router.get('/', getCategoriesController.getCategories);
router.get('/:id', getCategoryByIdController.getCategoryById);
router.post('/', authenticateJwt, createCategoryValidator, storeCategoryController.storeCategory);

module.exports = router;