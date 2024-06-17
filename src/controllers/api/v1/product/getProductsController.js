const productApiV1Repository = require('../../../../repositories/api/v1/product/repository');


const getProducts = async (req, res) => {
    try {
        const data = await productApiV1Repository.getProducts(req.query);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
};