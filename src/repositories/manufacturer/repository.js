const Manufacturer = require('../../models/manufacturer');

const getManufacturerById = async (id) => {
    try {
        return await Manufacturer.findById(id);
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllManufacturers = async (filterCondition, sortColumn, sortOrder, page, pagesLimit) => {
    try {
        let allResults = await Manufacturer.countDocuments(filterCondition);
        const totalPages = Math.ceil(allResults / pagesLimit);

        const results = await Manufacturer.find(filterCondition)
            .sort({[sortColumn]: sortOrder === 'asc' ? 1 : -1})
            .skip((page - 1) * pagesLimit)
            .limit(parseInt(pagesLimit))
            .exec();

        return {
            manufacturers: results,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: filterCondition?.name?.$regex
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getAllManufacturersForSelectOptions = async () => {
    try {
        return await Manufacturer.find({}).sort({['name']: 1}).exec();
    } catch (error) {
        console.error(error);

        throw error;
    }
}

module.exports = {
    getManufacturerById,
    getAllManufacturers,
    getAllManufacturersForSelectOptions,
};
