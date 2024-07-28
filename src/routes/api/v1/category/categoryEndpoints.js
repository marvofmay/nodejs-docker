const express = require('express');
const getCategoriesController = require('../../../../controllers/api/v1/category/getCategoriesController');
const getCategoryByIdController = require('../../../../controllers/api/v1/category/getCategoryByIdController');
const storeCategoryController = require('../../../../controllers/api/v1/category/storeCategoryController');
const ensureAuthenticated = require('../../../../../src/middleware/auth');
const { createCategoryValidator } = require('../../../../validators/category/createCategoryValidators');

const router = express.Router();

router.get('/', getCategoriesController.getCategories);
router.get('/:id', getCategoryByIdController.getCategoryById);
router.post('/', ensureAuthenticated, createCategoryValidator, storeCategoryController.storeCategory);

module.exports = router;