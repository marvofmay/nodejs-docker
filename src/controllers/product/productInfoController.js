const productRepository = require("../../repositories/product/repository");

const productInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productRepository.getProductById(id);

        res.render('products/info', {
            product: product,
            title: 'Info product',
            errors: [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    productInfo,
}