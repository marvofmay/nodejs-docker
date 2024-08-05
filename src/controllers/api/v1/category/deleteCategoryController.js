const CategoryService = require('../../../../services/category/CategoryService');

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const categoryService = new CategoryService();
        const deleteResult = await categoryService.deleteCategory(id);

        res.status(deleteResult.status).json({actionResult: deleteResult});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    deleteCategory,
};