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

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'product not found'});
    }
}

module.exports = {
    productInfo,
}