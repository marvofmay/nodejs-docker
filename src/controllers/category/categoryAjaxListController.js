const categoryRepository = require('../../repositories/category/repository');

const categoryAjaxList = async (req, res) => {
    try {
        const payload = req.body;
        let filterCondition = {};
        if (payload.phraseToSearch !== '') {
            filterCondition = { name: { $regex: payload.phraseToSearch, $options: 'i' } };
        }
        const actionResult = payload.actionResult ? payload.actionResult : {};
        const { categories, allResults, totalPages, page, pagesLimit, phraseToSearch } = await categoryRepository.getAllCategories(
            filterCondition,
            payload.sortColumn,
            payload.sortOrder,
            payload.page,
            payload.pagesLimit
        );

        res.send(res.render('categories/index', {
            title: 'Categories',
            categories: categories,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: phraseToSearch,
            actionResult: actionResult,
        }));
    } catch (error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
};

module.exports = {
    categoryAjaxList,
};