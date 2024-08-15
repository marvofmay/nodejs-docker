const ManufacturerService = require('../../services/manufacturer/ManufacturerService');

const manufacturerRestore = async (req, res) => {
    try {
        const id = req.params.id;
        const manufacturerService = new ManufacturerService();
        const restoreResult = await manufacturerService.restoreManufacturer(id);

        res.json({ actionResult: restoreResult });
    } catch (error) {
        res.render('error/error', {
            title: 'error',
            message: error.message
        });
    }
};

module.exports = {
    manufacturerRestore,
}