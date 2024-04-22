const categoryRepository = require('../../repositories/category/repository');

const categoryEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const category = await categoryRepository.getCategoryById(id);

        res.render('categories/edit', { category: category, title: 'Edit category', errors: [], actionResult: {}, });

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'category not found'});
    }
}

module.exports = {
    categoryEdit,
}