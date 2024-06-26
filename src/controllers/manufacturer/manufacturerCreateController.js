const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerCreate = async (req, res) => {
    try {
        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        res.render('manufacturers/create', {
            title: 'Manufacturers',
            action: 'Create a new manufacturer',
            manufacturer: {},
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: {}
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});;
    }
}

module.exports = {
    manufacturerCreate,
}