const categoryRepository = require("../../repositories/category/repository");

const categoryInfo = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryRepository.getCategoryById(id);

        res.render(
            'categories/info',
            {
                category: category,
                title: 'Categories',
                action: 'Info category',
                errors: [],
                actionResult: {},
            }
        );

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'category not found'});
    }
}

module.exports = {
    categoryInfo,
}