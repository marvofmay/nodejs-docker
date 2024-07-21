const Manufacturer = require('../../models/manufacturer');
const ManufacturerStructureTransformer = require('../../../src/repositories/api/v1/manufacturer/transformer/manufacturerStructureTransformer');

const getManufacturerStructure = async (manufacturer) => {
    if (! manufacturer || ! manufacturer._id) {
        throw new Error('Invalid manufacturer object');
    }

    const structure = {
        manufacturer: ManufacturerStructureTransformer(manufacturer),
        children: []
    };

    try {
        const children = await Manufacturer.find({ parentManufacturer: manufacturer._id });
        for (let child of children) {
            const childStructure = await getManufacturerStructure(child);
            if (childStructure) {
                structure.children.push(ManufacturerStructureTransformer(childStructure));
            }
        }
    } catch (error) {
        throw new Error('Error fetching manufacturer structure: ' + error.message);
    }

    return structure;
};

module.exports = getManufacturerStructure;
