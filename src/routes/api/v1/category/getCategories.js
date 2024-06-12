const express = require('express');
const getCategoriesController = require('../../../../controllers/api/v1/category/getCategoriesController');

const router = express.Router();

router.get('/', getCategoriesController.getCategories);

module.exports = router;