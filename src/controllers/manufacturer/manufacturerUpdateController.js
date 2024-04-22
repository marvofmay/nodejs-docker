const UpdateManufacturerDTO = require('../../dto/manufacturer/UpdateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../services/manufacturer/ManufacturerService');
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerUpdate = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);
        let manufacturer = await manufacturerRepository.getManufacturerById(req.body._id);
        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        if (! errors.isEmpty()) {
            return res.render('manufacturers/edit', {
                title: 'Update manufacturer',
                errors: errors.array(),
                manufacturers: manufacturersForSelect,
                manufacturer: manufacturer,
                actionResult: {},
            });
        }

        const { _id, name, shortName, nip, regon, email, www, parentManufacturer, address } = req.body;
        const updateManufacturerDTO = new UpdateManufacturerDTO(
            _id,
            name,
            shortName,
            nip,
            regon,
            email,
            www,
            parentManufacturer,
            address
        );
        const updateResult = await manufacturerService.updateManufacturer(updateManufacturerDTO);
        manufacturer = await manufacturerRepository.getManufacturerById(req.body._id);

        return res.render('manufacturers/edit', {
            title: 'Update manufacturer',
            errors: [],
            manufacturers: manufacturersForSelect,
            manufacturer: manufacturer,
            actionResult: updateResult,
        });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    manufacturerUpdate,
}