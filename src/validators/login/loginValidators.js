const { body, validationResult } = require('express-validator');;


const loginValidator = [
    body('login')
        .trim()
        .notEmpty().withMessage('login is required')
        .isLength({ min: 5 }).withMessage('login must be at least 3 characters long'),
    body('password')
        .trim()
        .notEmpty().withMessage('password is required')
        .isLength({ min: 5 }).withMessage('password must be at least 3 characters long'),
];

module.exports = { loginValidator };
