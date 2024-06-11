const { body } = require('express-validator');

const loginValidator = [
    body('login')
        .trim()
        .notEmpty().withMessage('Login is required')
        .isLength({ min: 5 }).withMessage('Login must be at least 5 characters long')
        .matches(/^[a-zA-Z0-9]+$/).withMessage('Login can only contain letters and numbers, no spaces allowed'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one digit')
        .matches(/[!@#&]/).withMessage('Password must contain at least one special character from !@#&')
];

module.exports = { loginValidator };
