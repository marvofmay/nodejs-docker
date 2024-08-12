const UpdateCategoryDTO = require('../../../../dto/category/UpdateCategoryDTO');
const CategoryService = require('../../../../services/category/CategoryService');
const { validationResult} = require("express-validator");

const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        const categoryService = new CategoryService();
        let updateCategoryDTO = new UpdateCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const updateResult = await categoryService.updateCategory(updateCategoryDTO);

        return res.status(200).json({
            actionResult: updateResult,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = {
    updateCategory,
}