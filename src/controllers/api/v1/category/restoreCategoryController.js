const RestoreCategoryDTO = require('../../../../dto/category/RestoreCategoryDTO');
const CategoryService = require('../../../../services/category/CategoryService');
const { validationResult} = require("express-validator");

/**
 * @swagger
 * /categories/restore:
 *   patch:
 *     tags:
 *       - Categories
 *     summary: Restore a soft-deleted category
 *     description: Restore a category by setting the `deletedAt` field to null.
 *     operationId: restoreCategory
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the category to restore.
 *                 example: 66baa281cce324a2f03a80d
 *     responses:
 *       200:
 *         description: Category restored successfully
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
 *                   example: "Category restored successfully"
 *                 status:
 *                   type: integer
 *                   example: 200
 *       400:
 *         description: Validation failed
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
 *                         example: "66baa281cce324a2f03a80d"
 *                       msg:
 *                         type: string
 *                         example: "Invalid Category ID"
 *                       path:
 *                         type: string
 *                         example: "id"
 *                       location:
 *                         type: string
 *                         example: "body"
 *       404:
 *         description: Category not found
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
 *                   example: "Category not found"
 *                 status:
 *                   type: integer
 *                   example: 404
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
 *                   example: "Internal Server Error"
 */
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

        return res.status(restoreResult.status).json(restoreResult);
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