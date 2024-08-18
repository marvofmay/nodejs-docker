const ProductService = require('../../services/product/ProductService');

const productRestore = async (req, res) => {
    try {
        const id = req.params.id;
        const productService = new ProductService();
        const restoreResult = await productService.restoreProduct(id);

        res.json({ actionResult: restoreResult });
    } catch (error) {
        res.render('error/error', {
            title: 'error',
            message: error.message
        });
    }
};

module.exports = {
    productRestore,
}