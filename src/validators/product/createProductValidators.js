const { body, validationResult } = require('express-validator');
const ProductRepository = require('../../repositories/product/repository');

const isInteger = (value) => {
    if (! Number.isInteger(Number(value))) {
        throw new Error('VAT must be an integer.');
    }
    return true;
};

const isEAN = (value) => {
    // Sprawdź, czy wartość jest dokładnie 13-cyfrowa
    if (value.length !== 13 || !/^\d{13}$/.test(value)) {
        throw new Error('Invalid EAN-13 code format. Must be exactly 13 digits.');
    }

    // Oddziel cyfrę kontrolną od pozostałych 12 cyfr
    const digits = value.split('').map(Number);
    const digitsWithoutChecksum = digits.slice(0, 12);
    const checksumProvided = digits[12];

    // Oblicz sumę kontrolną
    const oddSum = digitsWithoutChecksum.filter((_, i) => i % 2 === 0).reduce((acc, digit) => acc + digit, 0);
    const evenSum = digitsWithoutChecksum.filter((_, i) => i % 2 !== 0).reduce((acc, digit) => acc + digit, 0) * 3;
    const totalSum = oddSum + evenSum;
    const calculatedChecksum = (10 - (totalSum % 10)) % 10;

    // Sprawdź, czy obliczona suma kontrolna pasuje do podanej
    if (calculatedChecksum !== checksumProvided) {
        throw new Error('Invalid EAN-13 checksum. The provided code is incorrect.');
    }

    return true; // Kod EAN-13 jest poprawny
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
