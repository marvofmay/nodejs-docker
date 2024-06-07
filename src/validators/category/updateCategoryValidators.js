const { body, validationResult } = require('express-validator');
const CategoryRepository = require("../../repositories/category/repository");

const isCategoryNameExistsWithDifferentId = async (name, { req }) => {
    const categoryId = req.params.id;
    const category = await CategoryRepository.getCategoryByNameAndNotEqualId(name, categoryId);
    if (category) {
        throw new Error('Category name already exists');
    }
}

const updateCategoryValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long')
        .custom(isCategoryNameExistsWithDifferentId)
];

module.exports = { updateCategoryValidator };
