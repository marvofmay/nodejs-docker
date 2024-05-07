const manufacturerRepository = require('../../repositories/manufacturer/repository');

const manufacturerEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const manufacturer = await manufacturerRepository.getManufacturerById(id);
        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        res.render('manufacturers/edit', {
            title: 'Manufacturers',
            action: 'Edit manufacturer',
            manufacturer: manufacturer,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
}

module.exports = {
    manufacturerEdit,
}