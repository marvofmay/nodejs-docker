const productApiV1Repository = require('../../../../repositories/api/v1/product/repository');
const productTransformer = require("../../../../repositories/api/v1/product/transformer/productTransformer");


const getProductById = async (req, res) => {
    try {
        let product = await productApiV1Repository.getProductById(req);
        product = productTransformer(product);

        res.json(product);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getProductById,
};