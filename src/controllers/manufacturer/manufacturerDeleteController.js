const ManufacturerService = require('../../services/manufacturer/ManufacturerService');

const manufacturerDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const manufacturerService = new ManufacturerService();
        const deleteResult = await manufacturerService.deleteManufacturer(id);

        res.json({ actionResult: deleteResult });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    manufacturerDelete,
}