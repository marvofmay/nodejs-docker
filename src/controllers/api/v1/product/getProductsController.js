const productApiV1Repository = require('../../../../repositories/api/v1/product/repository');
const productTransformer = require('../../../../repositories/api/v1/product/transformer/productTransformer');

const getProducts = async (req, res) => {
    try {
        const data = await productApiV1Repository.getProducts(req.query);
        let { manufacturer, categories, photos} = req.query;
        manufacturer = manufacturer === 'true';
        categories = categories === 'true';
        photos = photos === 'true';

        data.products = data.products.map(product => productTransformer(product, categories, manufacturer, photos));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
};