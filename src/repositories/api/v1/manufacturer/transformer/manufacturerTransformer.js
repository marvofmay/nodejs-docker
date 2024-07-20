const DateUtility = require('../../../../../utility/DateUtility');

const manufacturerTransformer = (manufacturer) => {
    return data = {
        id: manufacturer._id,
        name: manufacturer.name,
        description: manufacturer.description,
        active: manufacturer.active,
        createdAt: DateUtility.formatDateYmdHis(manufacturer.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(manufacturer.updatedAt),
        deletedAt: manufacturer.deletedAt ? DateUtility.formatDateYmdHis(manufacturer.deletedAt) : null,
    };
};

module.exports = manufacturerTransformer;