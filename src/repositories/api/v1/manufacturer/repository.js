const Manufacturer = require("../../../../models/manufacturer");

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

        if (! id) {
            throw new Error('Invalid ID');
        }

        let manufacturerQuery = Manufacturer.findById(id).populate('parentManufacturer');
        const manufacturer = await manufacturerQuery;

        if (! manufacturer) {
            throw new Error('Manufacturer not found');
        }

        manufacturer.children = await getManufacturerChildren(manufacturer._id) ?? [];

        return { manufacturer };
    } catch (error) {
        return { error: error.message };
    }
};

const getManufacturerChildren = async (manufacturerId) => {
    try {
        return await Manufacturer.find({parentManufacturer: manufacturerId});
    } catch(error) {
        return { error: error.message };
    }
}

module.exports = {
    getManufacturers,
    getManufacturerById,
    getManufacturerChildren,
};
