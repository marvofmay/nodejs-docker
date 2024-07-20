const DateUtility = require('../../../../../utility/DateUtility');

const manufacturerTransformer = (manufacturer) => {
    const data = {
        id: manufacturer._id,
        name: manufacturer.name,
        shortName: manufacturer.shortName,
        nip: manufacturer.nip,
        regon: manufacturer.regon,
        email: manufacturer.email,
        www: manufacturer.www,
        createdAt: DateUtility.formatDateYmdHis(manufacturer.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(manufacturer.updatedAt),
        deletedAt: manufacturer.deletedAt ? DateUtility.formatDateYmdHis(manufacturer.deletedAt) : null,
    };

    if (manufacturer.parentManufacturer) {
        data.parentManufacturer = {
            id: manufacturer.parentManufacturer._id,
            name: manufacturer.parentManufacturer.name,
            shortName: manufacturer.parentManufacturer.shortName,
            nip: manufacturer.parentManufacturer.nip,
        };
    }

    return data;
};

module.exports = manufacturerTransformer;