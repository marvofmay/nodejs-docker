const CreateCategoryDTO = require('../../dto/category/CreateCategoryDTO');
const { validationResult } = require('express-validator');
const CategoryService = require('../../services/category/CategoryService');

const categoryStore = async (req, res) => {
    try {
        const categoryService = new CategoryService();
        const errors = validationResult(req);

        if (! errors.isEmpty()) {
            return res.render('categories/create', {
                title: 'Create a new category',
                errors: errors.array(),
                actionResult: {},
            });
        }

        const { name, description } = req.body;
        const createCategoryDTO = new CreateCategoryDTO(name, description);
        const createResult = await categoryService.createCategory(createCategoryDTO);

        return res.render('categories/create', {
            title: 'Create a new category',
            errors: [],
            actionResult: createResult,
        });
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    categoryStore,
}