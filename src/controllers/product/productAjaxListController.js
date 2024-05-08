const productRepository = require('../../repositories/product/repository');

const productAjaxList = async (req, res) => {
    try {
        const payload = req.body;
        let filterCondition = {};
        if (payload.phraseToSearch !== '') {
            filterCondition = { name: { $regex: payload.phraseToSearch, $options: 'i' } };
        }
        const actionResult = payload.actionResult ? payload.actionResult : {};
        const { products, allResults, totalPages, page, pagesLimit, phraseToSearch } = await productRepository.getAllProducts(
            filterCondition,
            payload.sortColumn,
            payload.sortOrder,
            payload.page,
            payload.pagesLimit
        );

        res.send(res.render('products/index', {
            title: 'Products',
            products: products,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: phraseToSearch,
            actionResult: actionResult,
        }));
    } catch (error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    productAjaxList,
};