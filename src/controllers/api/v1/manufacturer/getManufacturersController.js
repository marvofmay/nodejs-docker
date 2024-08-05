const manufacturerApiV1Repository = require('../../../../repositories/api/v1/manufacturer/repository');
const manufacturerTransformer = require("../../../../repositories/api/v1/manufacturer/transformer/manufacturerTransformer");

/**
 * @swagger
 * /manufacturers:
 *   get:
 *     summary: Retrieve a list of manufacturers
 *     tags: [Manufacturers]
 *     description: Retrieve a list of manufacturers with optional sorting and filtering by name.
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
 *         example: Manufacturer 1
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
 *                 manufacturers:
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
 */
const getManufacturers = async (req, res) => {
    try {
        const data = await manufacturerApiV1Repository.getManufacturers(req.query);
        data.manufacturers = data.manufacturers.map(manufacturer => manufacturerTransformer(manufacturer));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getManufacturers,
};