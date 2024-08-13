const express = require('express');
const getCategoriesController = require('../../../../controllers/api/v1/category/getCategoriesController');
const getCategoryByIdController = require('../../../../controllers/api/v1/category/getCategoryByIdController');
const storeCategoryController = require('../../../../controllers/api/v1/category/storeCategoryController');
const { createCategoryValidator } = require('../../../../validators/category/createCategoryValidators');
const deleteCategoryController = require("../../../../controllers/api/v1/category/deleteCategoryController");
const updateCategoryController = require("../../../../controllers/api/v1/category/updateCategoryController");
const restoreCategoryController = require("../../../../controllers/api/v1/category/restoreCategoryController");
const { updateCategoryValidator } = require('../../../../validators/category/updateCategoryValidators');
const { restoreCategoryValidator } = require('../../../../validators/category/restoreCategoryValidators');
const { authenticateJwt } = require('../../../../middleware/auth');

const router = express.Router();

router.get('/', getCategoriesController.getCategories);
router.get('/:id', getCategoryByIdController.getCategoryById);
router.post('/', authenticateJwt, createCategoryValidator, storeCategoryController.storeCategory);
router.delete('/', authenticateJwt, deleteCategoryController.deleteCategory);
router.put('/', authenticateJwt, updateCategoryValidator, updateCategoryController.updateCategory);
router.patch('/restore', authenticateJwt, restoreCategoryValidator, restoreCategoryController.restoreCategory);

module.exports = router;