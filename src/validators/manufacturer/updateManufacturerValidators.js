const { body } = require('express-validator');
const ManufacturerRepository = require('../../repositories/manufacturer/repository');

const isExistsNIPWithDifferentID = async (nip, { req }) => {
    const manufacturerId = req.params.id;
    const manufacturer = await ManufacturerRepository.getManufacturerByNIPAndNotEqualId(nip, manufacturerId);
    if (manufacturer) {
        throw new Error('Manufacturer with this NIP exists');
    }

    return true;
}

const isExistsREGONWithDifferentID = async (regon, { req }) => {
    const manufacturerId = req.params.id;
    const manufacturer = await ManufacturerRepository.getManufacturerByREGONAndNotEqualId(regon, manufacturerId);
    if (manufacturer) {
        throw new Error('Manufacturer with this REGON exists');
    }

    return true;
}

const updateManufacturerValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('nip')
        .trim()
        .notEmpty().withMessage('NIP is required.')
        .custom(isExistsNIPWithDifferentID),
    body('regon')
        .trim()
        .notEmpty().withMessage('REGON is required.')
        .custom(isExistsREGONWithDifferentID),
];

module.exports = { updateManufacturerValidator };
