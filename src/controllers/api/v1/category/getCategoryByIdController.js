const categoryApiV1Repository = require('../../../../repositories/api/v1/category/repository');

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A category object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                 deletedAt:
 *                   type: string
 *                   format: date-time
 *                   nullable: true
 *       500:
 *         description: Internal server error
 */
const getCategoryById = async (req, res) => {
    try {
       const data = await categoryApiV1Repository.getCategoryById(req);

        res.json(data);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getCategoryById,
};