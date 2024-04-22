const { body } = require('express-validator');

const updateManufacturerValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('nip')
        .trim()
        .notEmpty().withMessage('NIP is required.'),
    body('regon')
        .trim()
        .notEmpty().withMessage('REGON is required.')
];

module.exports = { updateManufacturerValidator };
