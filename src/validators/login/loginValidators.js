const { body } = require('express-validator');

const loginValidator = [
    body('login')
        .trim()
        .notEmpty().withMessage('Login is required')
        .isLength({ min: 5 }).withMessage('Login must be at least 5 characters long')
        .custom(value => {
            const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            if (! isEmail) {
                const isUsername = /^[a-zA-Z0-9]+$/.test(value) && value.length >= 5;
                if (! isUsername) {
                    throw new Error('Login must be either a valid email or a username with at least 5 characters (letters and numbers only, no spaces)');
                }
            }

            return true;
        }),
    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
        .matches(/[A-Z]/).withMessage('Password must contain at least one uppercase letter')
        .matches(/\d/).withMessage('Password must contain at least one digit')
        .matches(/[!@#&]/).withMessage('Password must contain at least one special character from !@#&')
];

module.exports = { loginValidator };
