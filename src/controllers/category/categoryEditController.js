const categoryRepository = require('../../repositories/category/repository');

const categoryEdit = async (req, res) => {
    try {
        const title = 'Categories';
        const action = 'Edit category';
        const categoryId = req.params.id;
        const category = await categoryRepository.getCategoryById(categoryId);

        res.render('categories/edit', {
            category: category,
            title: title,
            action: action,
            errors: [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
}

module.exports = {
    categoryEdit,
}