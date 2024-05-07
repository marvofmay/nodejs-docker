const CategoryService = require('../../services/category/CategoryService');

const categoryDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryService = new CategoryService();
        const deleteResult = await categoryService.deleteCategory(id);

        res.json({ actionResult: deleteResult });
    } catch (error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    categoryDelete,
}