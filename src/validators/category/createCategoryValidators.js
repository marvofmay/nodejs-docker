const { body, validationResult } = require('express-validator');

const createCategoryValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
];

module.exports = { createCategoryValidator };
