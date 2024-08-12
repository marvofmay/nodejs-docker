const DateUtility = require('../../../../../utility/DateUtility');

const categoryTransformer = (category) => {

    return {
        id: category._id,
        name: category.name,
        description: category.description,
        createdAt: DateUtility.formatDateYmdHis(category.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(category.updatedAt),
        deletedAt: category.deletedAt ? DateUtility.formatDateYmdHis(category.deletedAt) : null,
    }
}

module.exports = categoryTransformer;