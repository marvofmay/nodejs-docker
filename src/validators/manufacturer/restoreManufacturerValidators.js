const { body } = require('express-validator');
const mongoose = require('mongoose');

const invalidManufacturerId = async (value) => {
    if (! mongoose.Types.ObjectId.isValid(value)) {
        throw new Error('Invalid Manufacturer ID');
    }
};

const restoreManufacturerValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Manufacturer ID is required')
        .bail()
        .custom(invalidManufacturerId)
];

module.exports = { restoreManufacturerValidator };
