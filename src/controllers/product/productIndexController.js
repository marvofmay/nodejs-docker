const productRepository = require('../../repositories/product/repository');

const productIndex = async (req, res) => {

    try {
        const { products, allResults, totalPages, page, pagesLimit, phraseToSearch } = await productRepository.getAllProducts(
            {},
            'createdAt',
            'desc',
            1,
            5
        );

        res.render('products/index', {
            title: 'Products',
            products: products,
            allResults: allResults,
            totalPages: totalPages,
            pagesLimit: pagesLimit,
            page: page,
            phraseToSearch: phraseToSearch,
            actionResult: {},
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    productIndex,
}