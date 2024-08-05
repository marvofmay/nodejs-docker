const CategoryService = require('../../../../services/category/CategoryService');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     ActionResult:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful
 *           example: true
 *         message:
 *           type: string
 *           description: A message about the result of the delete operation
 *           example: 'Category marked as deleted successfully'
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *           example: 200
 *       required:
 *         - success
 *         - message
 *         - status
 *     DeleteCategoryResponse200:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: true
 *           message: "Category marked as deleted successfully"
 *           status: 200
 *     DeleteCategoryResponse400:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: true
 *           message: "Category not founded"
 *           status: 400
 *     DeleteCategoryResponse500:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: false
 *           message: "Failed to delete category"
 *           status: 500
 * /categories:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID.
 *     tags:
 *       - Categories
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
 *                 description: The ID of the category to delete
 *                 example: "66b08e5be6b7d0ab8547ce71"
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Category successfully marked as deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCategoryResponse200'
 *       400:
 *         description: Bad Request - Category not found or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCategoryResponse400'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteCategoryResponse500'
 */
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.body;
        const categoryService = new CategoryService();
        const deleteResult = await categoryService.deleteCategory(id);

        res.status(deleteResult.status).json({actionResult: deleteResult});
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    deleteCategory,
};