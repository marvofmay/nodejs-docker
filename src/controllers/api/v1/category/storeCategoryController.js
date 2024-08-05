const CreateCategoryDTO = require('../../../../dto/category/CreateCategoryDTO');
const { validationResult } = require('express-validator');
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
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: "Category 1"
 *         description:
 *           type: string
 *           description: Description of the category
 *           example: "Description of category 1"
 *       required:
 *         - name
 *   responses:
 *     CategoryCreated:
 *       description: Category created successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Category saved successfully."
 *               category:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Category 1"
 *                   description:
 *                     type: string
 *                     example: "Description of category 1"
 *                   deletedAt:
 *                     type: string
 *                     example: null
 *                   _id:
 *                     type: string
 *                     example: "66b08675d3f9cb26dc462f15"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-08-05T07:59:49.225Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-08-05T07:59:49.225Z"
 *                   __v:
 *                     type: integer
 *                     example: 0
 *     ValidationError:
 *       description: Validation failed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "field"
 *                     value:
 *                       type: string
 *                       example: "Category 1"
 *                     msg:
 *                       type: string
 *                       example: "Category name already exists"
 *                     path:
 *                       type: string
 *                       example: "name"
 *                     location:
 *                       type: string
 *                       example: "body"
 *               message:
 *                 type: string
 *                 example: "Validation failed"
 *               success:
 *                 type: boolean
 *                 example: false
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with the provided details.
 *     tags:
 *       - Categories
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/CategoryCreated'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 */

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
        res.status(500).json({ success:false, message: error.message });
    }
};

module.exports = {
    storeCategory,
}