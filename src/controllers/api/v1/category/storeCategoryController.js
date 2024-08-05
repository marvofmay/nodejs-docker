const CreateCategoryDTO = require('../../../../dto/category/CreateCategoryDTO');
const { validationResult } = require('express-validator');
const CategoryService = require('../../../../services/category/CategoryService');

const storeCategory = async (req, res) => {
    try {
        const categoryService = new CategoryService();
        const errors = validationResult(req);
        const createCategoryDTO = new CreateCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation failed',
                success: false,
            });
        }
        const createResult = await categoryService.createCategory(createCategoryDTO);

        return res.status(201).json(createResult);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    storeCategory,
}