const { body } = require('express-validator');
const mongoose = require('mongoose');

const invalidCategoryId = async (value) => {
    if (! mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Category ID');
    }
};

const restoreCategoryValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Category ID is required')
        .bail()
        .custom(invalidCategoryId)
];

module.exports = { restoreCategoryValidator };
