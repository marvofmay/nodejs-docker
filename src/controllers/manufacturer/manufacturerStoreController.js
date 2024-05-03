const CreateManufacturerDTO = require('../../dto/manufacturer/CreateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../services/manufacturer/ManufacturerService');
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerStore = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);
        let createManufacturerDTO = new CreateManufacturerDTO(req.body);

        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
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

        return res.render('manufacturers/create', {
            title: 'Manufacturers',
            action: 'Create a new manufacturer',
            manufacturer: {},
            errors: [],
            manufacturers: manufacturersForSelect,
            actionResult: createResult,
        });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    manufacturerStore,
}