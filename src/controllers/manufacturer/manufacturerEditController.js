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
            title: 'Edit manufacturer',
            manufacturer: manufacturer,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: {},
        });

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'manufacturer not found'});
    }
}

module.exports = {
    manufacturerEdit,
}