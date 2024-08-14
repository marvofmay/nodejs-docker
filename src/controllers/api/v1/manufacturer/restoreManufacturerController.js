const RestoreManufacturerDTO = require('../../../../dto/manufacturer/RestoreManufacturerDTO');
const ManufacturerService = require('../../../../services/manufacturer/ManufacturerService');
const { validationResult} = require("express-validator");

const restoreManufacturer = async (req, res) => {
    try {
        const errors = validationResult(req);
        const manufacturerService = new ManufacturerService();
        const restoreManufacturerDTO = new RestoreManufacturerDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        const restoreResult = await manufacturerService.restoreManufacturer(restoreManufacturerDTO);

        return res.status(restoreResult.status).json(restoreResult);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    restoreManufacturer,
}