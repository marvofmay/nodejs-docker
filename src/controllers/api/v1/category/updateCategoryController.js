const UpdateCategoryDTO = require('../../../../dto/category/UpdateCategoryDTO');
const CategoryService = require('../../../../services/category/CategoryService');
const { validationResult} = require("express-validator");

/**
 * @swagger
 * /categories:
 *   put:
 *     tags:
 *       - Categories
 *     summary: Update a category
 *     description: Updates an existing category by ID.
 *     operationId: updateCategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category to update.
 *                 example: "66b08e5be6b7d0ab8547ce72"
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: "Updated Category Name"
 *               description:
 *                 type: string
 *                 description: The description of the category.
 *                 example: "Updated Category Description"
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Category updated successfully"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "66b08e5be6b7d0ab8547ce71"
 *                     name:
 *                       type: string
 *                       example: "Updated Category Name"
 *                     description:
 *                       type: string
 *                       example: "Updated Category Description"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-05 08:33:31"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-12 20:52:48"
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-08-05 09:03:31"
 *       400:
 *         description: Validation failed due to duplicate Category Name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Validation failed"
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       type:
 *                         type: string
 *                         example: "field"
 *                       value:
 *                         type: string
 *                         example: "Category 2"
 *                       msg:
 *                         type: string
 *                         example: "Category name already exists"
 *                       path:
 *                         type: string
 *                         example: "name"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 */
const updateCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        const categoryService = new CategoryService();
        const updateCategoryDTO = new UpdateCategoryDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }

        const updateResult = await categoryService.updateCategory(updateCategoryDTO);

        return res.status(200).json(updateResult);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    updateCategory,
}