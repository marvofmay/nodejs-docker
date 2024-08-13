const { body } = require('express-validator');
const mongoose = require('mongoose');
const Category = require("../../models/category");

const isCategoryExists = async (value) => {
    if (! mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Category ID');
    }

    const category = await Category.findById(value);

    if (! category) {
        throw new Error('Category does not exist');
    }
};

const restoreCategoryValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Category ID is required.')
        .bail()
        .custom(isCategoryExists)
];

module.exports = { restoreCategoryValidator };
