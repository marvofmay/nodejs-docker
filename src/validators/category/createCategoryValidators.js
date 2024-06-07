const { body, validationResult } = require('express-validator');
const CategoryRepository = require('../../repositories/category/repository');

const isCategoryWithNameExists = async (name) => {
    const category = await CategoryRepository.getCategoryByName(name);
    if (category) {
        throw new Error('Category name already exists');
    }
}

const createCategoryValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .custom(isCategoryWithNameExists)
];

module.exports = { createCategoryValidator };
