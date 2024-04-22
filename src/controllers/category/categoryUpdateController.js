const UpdateCategoryDTO = require('../../dto/category/UpdateCategoryDTO');
const CategoryService = require('../../services/category/CategoryService');
const { validationResult} = require("express-validator");
const Category = require('../../models/category');

const categoryUpdate = async (req, res) => {
    try {
        const errors = validationResult(req);
        const categoryService = new CategoryService();
        const { _id, name, description } = req.body;
        let updateCategoryDTO = new UpdateCategoryDTO(_id, name, description);

        if (! errors.isEmpty()) {
            return res.render('categories/edit', {
                title: 'Edit category',
                category: updateCategoryDTO,
                errors: errors.array(),
                actionResult: {},
            });
        }

        const updateResult = await categoryService.updateCategory(updateCategoryDTO)
        category = await Category.findById(req.body._id);

        return res.render('categories/edit', {
            title: 'Edit category',
            category: category,
            errors: [],
            actionResult: updateResult,
        });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    categoryUpdate,
}