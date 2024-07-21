const Manufacturer = require("../../../../models/manufacturer");
const getManufacturerStructure = require('../../../../utility/manufacturer/getManufacturerStructure');

const getManufacturers = async (params) =>
{
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', parentManufacturer, ...filters } = params;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    const query = { deletedAt: null, ...filters };

    const populateFields = [];

    if (parentManufacturer === 'true') {
        populateFields.push('parentManufacturer');
    }

    const manufacturersQuery = Manufacturer.find(query)
        .sort({ [sort]: sortOrder })
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt);

    populateFields.forEach(field => manufacturersQuery.populate(field));

    const manufacturers = await manufacturersQuery;
    const total = await Manufacturer.countDocuments(query);

    return {
        total,
        page: pageInt,
        totalPages: Math.ceil(total / limitInt),
        manufacturers: manufacturers,
    };
}

const getManufacturerById = async (req) => {
    try {
        const { id } = req.params;
        const { structure } = req.query;
        let manufacturerStructure = null;

        if (! id) {
            throw new Error('Invalid ID');
        }

        let manufacturerQuery = Manufacturer.findById(id).populate('parentManufacturer');
        const manufacturer = await manufacturerQuery;

        if (! manufacturer) {
            throw new Error('Manufacturer not found');
        }

        if (structure === 'true') {
            console.log('xxx', await getManufacturerStructure(manufacturer));
            manufacturerStructure = await getManufacturerStructure(manufacturer);
        }

        return { manufacturer, manufacturerStructure };
    } catch (error) {
        return { error: error.message };
    }
};

module.exports = {
    getManufacturers,
    getManufacturerById,
};
