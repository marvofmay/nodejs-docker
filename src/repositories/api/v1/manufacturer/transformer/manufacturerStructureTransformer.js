const manufacturerStructureTransformer = (manufacturer) => {
    return {
        id: manufacturer._id,
        name: manufacturer.name,
        shortName: manufacturer.shortName
    };
};

module.exports = manufacturerStructureTransformer;