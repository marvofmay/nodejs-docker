const UpdateCategoryDTO = require('../../dto/category/UpdateCategoryDTO');
const CategoryService = require('../../services/category/CategoryService');
const { validationResult} = require("express-validator");
const Category = require('../../models/category');

const categoryUpdate = async (req, res) => {
    try {
        const title = 'Categories';
        const action = 'Edit category';
        const errors = validationResult(req);
        const categoryService = new CategoryService();
        let updateCategoryDTO = new UpdateCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.render('categories/edit', {
                title: title,
                action: action,
                category: updateCategoryDTO,
                errors: errors.array(),
                actionResult: {},
            });
        }

        const updateResult = await categoryService.updateCategory(updateCategoryDTO)
        const category = await Category.findById(req.body._id);

        return res.render('categories/edit', {
            title: title,
            action: action,
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