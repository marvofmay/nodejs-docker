const ProductService = require('../../../../services/product/ProductService');


const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const productService = new ProductService();
        const deleteResult = await productService.deleteProduct(id);

        if (deleteResult.error) {
            res.status(deleteResult.status).json({actionResult: deleteResult});
        } else {
            res.status(deleteResult.status).json({actionResult: deleteResult});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    deleteProduct,
};
