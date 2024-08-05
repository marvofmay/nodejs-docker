const categoryApiV1Repository = require('../../../../repositories/api/v1/category/repository');

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve a list of categories
 *     tags: [Categories]
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
 *                   example: 2
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
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *                         example: ""
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                       deletedAt:
 *                         type: string
 *                         format: date-time
 *                         nullable: true
 *                   example:
 *                     - id: 666770f2f4105744b4ec01e9
 *                       name: category 5
 *                       description: ""
 *                       createdAt: "2024-06-10 21:33:26"
 *                       updatedAt: "2024-06-10 21:33:26"
 *                       deletedAt: null
 *                     - id: 666770f2f4105744b4ec01e8
 *                       name: category 6
 *                       description: ""
 *                       createdAt: "2024-06-11 10:15:00"
 *                       updatedAt: "2024-06-11 10:15:00"
 *                       deletedAt: null
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