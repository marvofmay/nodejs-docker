const manufacturerRepository = require('../../repositories/manufacturer/repository');

const manufacturerAjaxList = async (req, res) => {
    try {
        const payload = req.body;
        let filterCondition = {};
        if (payload.phraseToSearch !== '') {
            filterCondition = { name: { $regex: payload.phraseToSearch, $options: 'i' } };
        }
        const actionResult = payload.actionResult ? payload.actionResult : {};
        const { manufacturers, allResults, totalPages, page, pagesLimit, phraseToSearch } = await manufacturerRepository.getAllManufacturers(
            filterCondition,
            payload.sortColumn,
            payload.sortOrder,
            payload.page,
            payload.pagesLimit
        );

        res.send(res.render('manufacturers/index', {
            title: 'Manufacturers',
            manufacturers: manufacturers,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: phraseToSearch,
            actionResult: actionResult,
        }));
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    manufacturerAjaxList,
};