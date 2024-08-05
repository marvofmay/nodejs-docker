const Product = require("../../../../models/product");
const DateUtility = require("../../../../utility/DateUtility");
const {isNull} = require("lodash/lang");

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

const getProductById = async (req) => {
    const { id } = req.params;
    const { manufacturer, categories, photos } = req.query;

    const populateOptions = [];

    if (manufacturer === 'true') {
        populateOptions.push('manufacturer');
    }
    if (categories === 'true') {
        populateOptions.push('categories');
    }
    if (photos === 'true') {
        populateOptions.push('photos');
    }

    let productQuery = await Product.findById(id);

    if (productQuery === null) {
        return productQuery;
    }

    populateOptions.forEach(option => {
        productQuery = productQuery.populate(option);
    });

    const product = await productQuery;

    return data = {
        name: product.name,
        description: product.description,
        ean: product.ean,
        price: product.price,
        vat: product.vat,
        bonusPercent: product.bonusPercent,
        manufacturer: manufacturer === 'true' ? product.manufacturer : undefined,
        categories: categories === 'true' ? product.categories : undefined,
        photos: photos === 'true' ? product.photos : undefined,
        active: product.active,
        createdAt: DateUtility.formatDateYmdHis(product.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(product.updatedAt),
        deletedAt: product.deletedAt ? DateUtility.formatDateYmdHis(product.deletedAt) : null,
    };
}

module.exports = {
    getProducts,
    getProductById,
};
