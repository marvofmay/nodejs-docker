const manufacturerRepository = require('../../repositories/manufacturer/repository');

const manufacturerIndex = async (req, res) => {
    try {
        const { manufacturers, allResults, totalPages, page, pagesLimit, phraseToSearch } = await manufacturerRepository.getAllManufacturers(
            {},
            'createdAt',
            'desc',
            1,
            5
        );

        res.render('manufacturers/index', {
            title: 'Manufacturers',
            manufacturers: manufacturers,
            allResults: allResults,
            totalPages: totalPages,
            page: page,
            pagesLimit: pagesLimit,
            phraseToSearch: phraseToSearch,
            actionResult: {},
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    manufacturerIndex,
}