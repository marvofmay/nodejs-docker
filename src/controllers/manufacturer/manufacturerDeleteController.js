const ManufacturerService = require('../../services/manufacturer/ManufacturerService');

const manufacturerDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const manufacturerService = new ManufacturerService();
        const deleteResult = await manufacturerService.deleteManufacturer(id);

        res.json({ actionResult: deleteResult });
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
};

module.exports = {
    manufacturerDelete,
}