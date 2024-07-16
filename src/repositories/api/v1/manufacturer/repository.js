const Manufacturer = require("../../../../models/manufacturer");

const getManufacturers = async (params) =>
{
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', ...filters } = params;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    const query = { deletedAt: null, ...filters };

    const manufacturersQuery = Manufacturer.find(query)
        .sort({ [sort]: sortOrder })
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt);

    const manufacturers = await manufacturersQuery;
    const total = await Manufacturer.countDocuments(query);

    return {
        total,
        page: pageInt,
        totalPages: Math.ceil(total / limitInt),
        manufacturers: manufacturers,
    };
}

module.exports = {
    getManufacturers,
};
