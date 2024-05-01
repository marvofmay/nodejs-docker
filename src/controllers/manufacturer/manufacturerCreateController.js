const manufacturerRepository = require("../../repositories/manufacturer/repository");
const CreateManufacturerDTO = require("../../dto/manufacturer/CreateManufacturerDTO");
const manufacturerCreate = async (req, res) => {

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
}

module.exports = {
    manufacturerCreate,
}