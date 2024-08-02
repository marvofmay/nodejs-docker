const CreateManufacturerDTO = require('../../../../dto/manufacturer/CreateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../../../services/manufacturer/ManufacturerService');

const storeManufacturer = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);
        const createManufacturerDTO = new CreateManufacturerDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation failed',
            });
        }
        const createResult = await manufacturerService.createManufacturer(createManufacturerDTO);

        return res.status(201).json(createResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    storeManufacturer,
}