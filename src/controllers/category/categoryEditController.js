const categoryRepository = require('../../repositories/category/repository');

const categoryEdit = async (req, res) => {
    try {
        const title = 'Categories';
        const action = 'Edit category';
        const categoryId = req.params.id;
        const category = await categoryRepository.getCategoryById(categoryId);

        res.render('categories/edit', {
            title: title,
            action: action,
            category: category,
            errors: [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    categoryEdit,
}