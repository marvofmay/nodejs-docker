const CreateManufacturerDTO = require('../../dto/manufacturer/CreateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../services/manufacturer/ManufacturerService');
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerStore = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);
        let createManufacturerDTO = new CreateManufacturerDTO(req.body);

        let manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        let manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        if (! errors.isEmpty()) {
            return res.render('manufacturers/create', {
                title: 'Manufacturers',
                action: 'Create a new manufacturer',
                manufacturer: createManufacturerDTO,
                errors: errors.array(),
                manufacturers: manufacturersForSelect,
                actionResult: {},
            });
        }

        const createResult = await manufacturerService.createManufacturer(createManufacturerDTO);
        manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        return res.render('manufacturers/create', {
            title: 'Manufacturers',
            action: 'Create a new manufacturer',
            manufacturer: {},
            errors: [],
            manufacturers: manufacturersForSelect,
            actionResult: createResult,
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    manufacturerStore,
}