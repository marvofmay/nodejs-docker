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
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    manufacturerInfo,
}