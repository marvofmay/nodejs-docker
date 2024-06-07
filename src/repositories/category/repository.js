const Category = require('../../models/category');

const getCategoryById = async (id) => {
    try {
        return await Category.findById(id);
    } catch (error) {
        console.error(error);

        throw error;
    }
}

const getAllCategories = async (filterCondition, sortColumn, sortOrder, page, pagesLimit) => {
    try {
        const allResults = await Category.countDocuments(filterCondition);
        const totalPages = Math.ceil(allResults / pagesLimit);

        if (totalPages > 0 && totalPages < page) {
            page = page - 1;
        }

        const results = await Category.find(filterCondition)
            .sort({[sortColumn]: sortOrder === 'asc' ? 1 : -1})
            .skip((page - 1) * pagesLimit)
            .limit(parseInt(pagesLimit))
            .exec();

        return {
            categories: results,
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

const getAllCategoriesForSelectOptions = async () => {
    try {
        return await Category.find({}).sort({['name']: 1}).exec();
    } catch (error) {
        console.error(error);

        throw error;
    }
}

const getCategoryByName = async name => {
    return await Category.findOne({ name }).exec();
}

const getCategoryByNameAndNotEqualId = async (name, id) => {
    return await Category.findOne({ name, _id: { $ne: id } }).exec();
}

module.exports = {
    getCategoryById,
    getAllCategories,
    getAllCategoriesForSelectOptions,
    getCategoryByName,
    getCategoryByNameAndNotEqualId,
};
