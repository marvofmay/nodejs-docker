const CreateManufacturerDTO = require('../../dto/manufacturer/CreateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../services/manufacturer/ManufacturerService');
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerStore = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);

        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        if (! errors.isEmpty()) {
            return res.render('manufacturers/create', {
                title: 'Manufacturer a new category',
                errors: errors.array(),
                manufacturers: manufacturersForSelect,
                actionResult: {},
            });
        }

        const { name, shortName, nip, regon, email, www, parentManufacturer, address } = req.body;
        const createManufacturerDTO = new CreateManufacturerDTO(
            name,
            shortName,
            nip,
            regon,
            email,
            www,
            parentManufacturer,
            address
        );
        const createResult = await manufacturerService.createManufacturer(createManufacturerDTO);

        return res.render('manufacturers/create', {
            title: 'Create a new manufacturer',
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