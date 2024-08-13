const RestoreCategoryDTO = require('../../../../dto/category/RestoreCategoryDTO');
const CategoryService = require('../../../../services/category/CategoryService');
const { validationResult} = require("express-validator");

const restoreCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        const categoryService = new CategoryService();
        const restoreCategoryDTO = new RestoreCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const restoreResult = await categoryService.restoreCategory(restoreCategoryDTO);

        return res.status(200).json(restoreResult);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    restoreCategory,
}