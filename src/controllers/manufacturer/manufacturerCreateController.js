const manufacturerRepository = require("../../repositories/manufacturer/repository");
const manufacturerCreate = async (req, res) => {

    const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
    const manufacturersForSelect = manufacturers.map(manufacturer => ({
        _id: manufacturer._id,
        name: manufacturer.name
    }));

    res.render('manufacturers/create', {
        title: 'Create a new manufacturer',
        manufacturers: manufacturersForSelect,
        errors: [],
        actionResult: {}
    });
}

module.exports = {
    manufacturerCreate,
}