const { body } = require('express-validator');
const CategoryRepository = require("../../repositories/category/repository");
const ManufacturerRepository = require('../../repositories/manufacturer/repository');

const updateManufacturerValidator = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required.')
        .isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
    body('nip')
        .trim()
        .notEmpty().withMessage('NIP is required.')
        .custom(async (nip, { req }) => {
            const manufacturerId = req.params.id;
            const manufacturer = await ManufacturerRepository.getManufacturerByNIPAndNotEqualId(nip, manufacturerId);
            if (manufacturer) {
                throw new Error('Manufacturer with this NIP exists');
            }
    }),
    body('regon')
        .trim()
        .notEmpty().withMessage('REGON is required.')
];

module.exports = { updateManufacturerValidator };
