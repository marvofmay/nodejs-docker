const express = require('express');
const categoryCreateController = require('../controllers/category/categoryCreateController');
const categoryInfoController = require('../controllers/category/categoryInfoController');
const categoryEditController = require('../controllers/category/categoryEditController');
const categoryPDFController = require('../controllers/category/categoryPDFController');
const categoryIndexController = require('../controllers/category/categoryIndexController');
const categoryAjaxListController = require('../controllers/category/categoryAjaxListController');
const categoryStoreController = require('../controllers/category/categoryStoreController');
const categoryUpdateController = require('../controllers/category/categoryUpdateController');
const categoryDeleteController = require('../controllers/category/categoryDeleteController');
const categoryRestoreController = require('../controllers/category/categoryRestoreController');
const { createCategoryValidator } = require('../validators/category/createCategoryValidators');
const { updateCategoryValidator } = require('../validators/category/updateCategoryValidators');

const router = express.Router();

router.get('/create', categoryCreateController.categoryCreate);
router.get('/pdf/:id', categoryPDFController.categoryPDF);
router.get('/info/:id', categoryInfoController.categoryInfo);
router.get('/edit/:id', categoryEditController.categoryEdit);
router.get('/', categoryIndexController.categoryIndex);
router.post('/ajaxList', categoryAjaxListController.categoryAjaxList);
router.post('/store', createCategoryValidator, categoryStoreController.categoryStore);
router.put('/:id', updateCategoryValidator, categoryUpdateController.categoryUpdate);
router.delete('/:id', categoryDeleteController.categoryDelete);
router.patch('/:id/restore', categoryRestoreController.categoryRestore);

module.exports = router;