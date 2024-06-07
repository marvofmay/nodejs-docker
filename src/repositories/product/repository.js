const Product = require('../../models/product');
const mongoose = require('mongoose');
const Category = require("../../models/category");

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);
        if (product) {
            const productWithRelations = await Product.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(id) }
                },
                {
                    $lookup: {
                        from: "photos",
                        localField: "photos",
                        foreignField: "_id",
                        as: "photos"
                    }
                },
                {
                    $lookup: {
                        from: "manufacturers",
                        localField: "manufacturer",
                        foreignField: "_id",
                        as: "manufacturer"
                    }
                },
                {
                    $lookup: {
                        from: "categories",
                        localField: "categories",
                        foreignField: "_id",
                        as: "categories"
                    }
                }
            ]).exec();

            return productWithRelations[0];
        } else {
            console.log("Produkt o podanym ID nie został znaleziony.");
        }
    } catch (error) {
        console.error(error);

        throw error;
    }
}

const getAllProducts = async (filterCondition, sortColumn, sortOrder, page, pagesLimit) => {
    try {
        const allResults = await Product.countDocuments(filterCondition);
        const totalPages = Math.ceil(allResults / pagesLimit);

        if (totalPages > 0 && totalPages < page) {
            page = page - 1;
        }

        if (totalPages > 0 && totalPages < page) {
            page = page - 1;
        }

        const results = await Product.find(filterCondition)
            .sort({[sortColumn]: sortOrder === 'asc' ? 1 : -1})
            .skip((page - 1) * pagesLimit)
            .limit(parseInt(pagesLimit))
            .exec();

        return {
            products: results,
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

const getProductByEAN = async ean => {
    try {
        return await Product.findOne({ ean }).exec();
    } catch (error) {
        console.error('Error fetching product by EAN:', error);

        throw error;
    }
};

const getProductByEanAndNotEqualId = async (ean, id) => {
    try {
        return await Product.findOne({ ean, _id: { $ne: id } }).exec();
    } catch (error) {
        console.error('Error fetching category by name and not equal id:', error);

        throw error;
    }
};

module.exports = {
    getProductById,
    getAllProducts,
    getProductByEAN,
    getProductByEanAndNotEqualId,
};
