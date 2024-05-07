const CreateCategoryDTO = require('../../dto/category/CreateCategoryDTO');
const { validationResult } = require('express-validator');
const CategoryService = require('../../services/category/CategoryService');

const categoryStore = async (req, res) => {
    try {
        const categoryService = new CategoryService();
        const errors = validationResult(req);
        const createCategoryDTO = new CreateCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.render('categories/create', {
                title: 'Categories',
                action: 'Create a new category',
                category: createCategoryDTO,
                errors: errors.array(),
                actionResult: {},
            });
        }

        const createResult = await categoryService.createCategory(createCategoryDTO);

        return res.render('categories/create', {
            title: 'Categories',
            action: 'Create a new category',
            category: {},
            errors: [],
            actionResult: createResult,
        });
    } catch(error) {
        res.render('error/404error', {title: '404 error', message: error.message});
    }
};
module.exports = {
    categoryStore,
}