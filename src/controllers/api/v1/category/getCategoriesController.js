const categoryApiV1Repository = require('../../../../repositories/api/v1/category/repository');

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     description: Retrieve a list of categories with optional sorting and filtering by name.
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         required: false
 *         description: The field to sort by
 *         example: createdAt
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         required: false
 *         description: The sort order (asc or desc)
 *         example: desc
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter categories by name
 *         example: Category 5
 *     responses:
 *       200:
 *         description: A list of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   example: 1
 *                 pages:
 *                   type: integer
 *                   example: 1
 *                 currentPage:
 *                   type: integer
 *                   example: 1
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: category 5
 *                       description:
 *                         type: string
 *                         example: ""
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-10 21:33:26"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-06-10 21:33:26"
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                         example: null
 */
const getCategories = async (req, res) => {
    try {
        const data = await categoryApiV1Repository.getCategories(req.query);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getCategories,
};