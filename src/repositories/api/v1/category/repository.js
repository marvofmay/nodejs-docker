const Category = require('../../../../models/category');
const Product = require("../../../../models/product");

const getCategories = async (params) =>
{
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', ...filters } = params;
    const mongoFilters = {};
    for (const key in filters) {
        if (filters.hasOwnProperty(key)) {
            mongoFilters[key] = { $regex: filters[key], $options: 'i' };
        }
    }

    const categories = await Category.find(mongoFilters)
        .sort({[sort]: order === 'asc' ? 1 : -1})
        .skip((page - 1) * limit)
        .limit(parseInt(limit));

    const totalCategories = await Category.countDocuments(filters);

    return {
        total: totalCategories,
        pages: Math.ceil(totalCategories / limit),
        currentPage: page,
        categories: categories,
    }
}

const getCategoryById = async (req) => {
    const { id } = req.params;
    const { products } = req.query;
    const category = await Category.findById(id);

    const data = {
        name: category.name,
        description: category.description,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt,
        deletedAt: category.deletedAt,
    }

    if (products === 'true') {
        data.products = await Product.find({categories: id});
    }

    return data;
}

module.exports = {
    getCategories,
    getCategoryById,
};
