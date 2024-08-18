const { body } = require('express-validator');
const mongoose = require('mongoose');

const invalidCategoryId = async (value) => {
    if (! mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid product ID');
    }
};

const restoreProductValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Product ID is required')
        .bail()
        .custom(invalidCategoryId)
];

module.exports = { restoreProductValidator };
