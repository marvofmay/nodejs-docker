const { body, validationResult } = require('express-validator');
const ProductRepository = require('../../repositories/product/repository');

const isInteger = (value) => {
    if (! Number.isInteger(Number(value))) {
        throw new Error('VAT must be an integer.');
    }
    return true;
};

const isEAN = (value) => {
    if (value.length !== 13 || isNaN(value)) {
        throw new Error('EAN must be a 13-digit number.');
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
        sum += parseInt(value[i]) * (i % 2 === 0 ? 1 : 3);
    }

    const checksum = (10 - (sum % 10)) % 10;
    if (checksum !== parseInt(value[12])) {
        throw new Error('Invalid EAN checksum.');
    }

    return true;
};

const isEANExists = async (ean, { req }) => {
    const product = await ProductRepository.getProductByEAN(ean);
    if (product) {
        throw new Error('Product with this EAN already exists');
    }

    return true;
}

const createProductValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('ean')
        .trim()
        .notEmpty().withMessage('EAN is required.')
        .custom(isEAN)
        .custom(isEANExists),
    body('price')
        .trim()
        .notEmpty().withMessage('Price is required.')
        .isNumeric().withMessage('Price must be a number.'),
    body('vat')
        .trim()
        .custom(isInteger),
    body('bonusPercent')
        .optional()
        .isInt().withMessage('Bonus Percent must be an integer.'),
    body('manufacturer')
        .trim()
        .notEmpty().withMessage('Manufacturer is required.'),
    body('categories')
        .trim()
        .notEmpty().withMessage('Categories are required.'),
];

module.exports = { createProductValidator };
