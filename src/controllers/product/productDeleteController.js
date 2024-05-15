const ProductService = require('../../services/product/ProductService');

const productDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const productService = new ProductService();
        const deleteResult = await productService.deleteProduct(id);

        res.json({ actionResult: deleteResult });
    } catch (error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    productDelete,
}