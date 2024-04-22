const CategoryService = require('../../services/category/CategoryService');

const categoryDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const categoryService = new CategoryService();
        const deleteResult = await categoryService.deleteCategory(id);

        res.json({ actionResult: deleteResult });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    categoryDelete,
}