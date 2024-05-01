const manufacturerRepository = require("../../repositories/manufacturer/repository");

const manufacturerInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await manufacturerRepository.getManufacturerById(id)

        res.render(
            'manufacturers/info',
            {
                manufacturer: result,
                title: 'Manufacturers',
                action: 'Info manufacturer',
            }
        );
    } catch (error) {
        console.log(error);

        res.render('404error', { title: 'manufacturer not found' });
    }
}

module.exports = {
    manufacturerInfo,
}