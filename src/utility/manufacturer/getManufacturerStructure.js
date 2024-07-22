const Manufacturer = require('../../models/manufacturer');
const ManufacturerStructureTransformer = require('../../../src/repositories/api/v1/manufacturer/transformer/manufacturerStructureTransformer');

const getManufacturerStructure = async (manufacturer) => {
    if (! manufacturer || ! manufacturer._id) {
        throw new Error('Invalid manufacturer object');
    }

    return structure;
};

module.exports = getManufacturerStructure;
