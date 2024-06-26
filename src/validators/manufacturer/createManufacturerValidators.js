const { body } = require('express-validator');
const ManufacturerRepository = require('../../repositories/manufacturer/repository');

const isExistsNIP = async (value, { req }) => {
    const manufacturer = await ManufacturerRepository.getManufacturerByNIP(value);
    if (manufacturer) {
        throw new Error('Manufacturer with this NIP already exists');
    }

    return true;
}

const isExistsREGON = async (value, { req }) => {
    const manufacturer = await ManufacturerRepository.getManufacturerByREGON(value);
    if (manufacturer) {
        throw new Error('Manufacturer with this REGON already exists');
    }

    return true;
}

const createManufacturerValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('nip')
        .trim()
        .notEmpty().withMessage('NIP is required.')
        .custom(isExistsNIP),
    body('regon')
        .trim()
        .notEmpty().withMessage('REGON is required')
        .custom(isExistsREGON),
];

module.exports = { createManufacturerValidator };
