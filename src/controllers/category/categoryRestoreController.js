const CategoryService = require('../../services/category/CategoryService');

const categoryRestore = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryService = new CategoryService();
        const restoreResult = await categoryService.restoreCategory(id);

        res.json({ actionResult: restoreResult });
    } catch (error) {
        res.render('error/error', {
            title: 'error',
            message: error.message
        });
    }
};

module.exports = {
    categoryRestore,
}