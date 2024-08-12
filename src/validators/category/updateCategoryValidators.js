const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const CategoryRepository = require("../../repositories/category/repository");
const Category = require("../../models/category");

const isCategoryExists = async (value, { req }) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Category ID');
    }
    const category = await Category.findById(value);
    if (!category) {
        throw new Error('Category does not exist');
    }
};

const isCategoryNameExistsWithDifferentId = async (value, { req }) => {
    const categoryId = req.body.id;
    const category = await CategoryRepository.getCategoryByNameAndNotEqualId(value, categoryId);
    if (category) {
        throw new Error('Category name already exists');
    }
};

const updateCategoryValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Category ID is required.')
        .bail()
        .custom(isCategoryExists)
        .bail(),

    body('name').custom(async (value, { req }) => {
        const errors = validationResult(req);
        if (! errors.isEmpty()) {
            return true;
        }

        if (! value || value.trim() === '') {
            throw new Error('Name is required.');
        }
        if (value.length < 3) {
            throw new Error('Name must be at least 3 characters long');
        }
        await isCategoryNameExistsWithDifferentId(value, { req });

        return true;
    })
];

module.exports = { updateCategoryValidator };
