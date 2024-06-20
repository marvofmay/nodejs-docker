const Product = require("../../../../models/product");

const getProducts = async (params) =>
{
    const { page = 1, limit = 10, sort = 'createdAt', order = 'asc', manufacturer, categories, photos, ...filters } = params;

    const pageInt = parseInt(page);
    const limitInt = parseInt(limit);
    const sortOrder = order === 'asc' ? 1 : -1;
    const query = { deletedAt: null, ...filters };
    const populateFields = [];

    if (manufacturer === 'true') {
        populateFields.push('manufacturer');
    }
    if (categories === 'true') {
        populateFields.push('categories');
    }
    if (photos === 'true') {
        populateFields.push('photos');
    }

    const productsQuery = Product.find(query)
        .sort({ [sort]: sortOrder })
        .skip((pageInt - 1) * limitInt)
        .limit(limitInt);

    populateFields.forEach(field => productsQuery.populate(field));

    const products = await productsQuery;
    const total = await Product.countDocuments(query);

    return {
        total,
        page: pageInt,
        totalPages: Math.ceil(total / limitInt),
        products: products,
    };
}

module.exports = {
    getProducts,
    //getProductById,
};
