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
        const category = await Category.findById(req.body.id);

        return res.render('categories/edit', {
            title: title,
            action: action,
            category: category,
            errors: [],
            actionResult: updateResult,
        });
    } catch(error) {
        res.render('error/error', {
            title: 'error',
            message: error.message
        });
    }
}

module.exports = {
    categoryUpdate,
}