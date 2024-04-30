const Product = require('../../models/product');
const mongoose = require('mongoose');

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
        let allResults = await Product.countDocuments(filterCondition);
        const totalPages =  Math.ceil(allResults / pagesLimit);
        const results = await Product.find()
            .sort({[sortColumn]: sortOrder === 'asc' ? 1 : -1})
            .skip((page - 1) * pagesLimit)
            .limit(pagesLimit)
            .exec()

        return {
            products: results,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: filterCondition?.name?.$regex
        };

    } catch (error) {

    }
}

module.exports = {
    getProductById,
    getAllProducts,
};
