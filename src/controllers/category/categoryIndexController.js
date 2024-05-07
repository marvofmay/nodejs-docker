const categoryRepository = require("../../repositories/category/repository");

const categoryIndex = async (req, res) => {

    try {
        const { categories, allResults, totalPages, page, pagesLimit, phraseToSearch } = await categoryRepository.getAllCategories(
            {},
            'createdAt',
            'desc',
            1,
            5
        );

        res.render('categories/index', {
            title: 'Categories',
            categories: categories,
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
    categoryIndex,
}