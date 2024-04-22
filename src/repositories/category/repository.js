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
        let allResults = await Category.countDocuments(filterCondition);
        const totalPages = Math.ceil(allResults / pagesLimit);
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

module.exports = {
    getCategoryById,
    getAllCategories,
    getAllCategoriesForSelectOptions,
};
