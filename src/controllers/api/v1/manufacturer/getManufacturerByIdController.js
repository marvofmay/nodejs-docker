const manufacturerApiV1Repository = require('../../../../repositories/api/v1/manufacturer/repository');
const manufacturerTransformer = require("../../../../repositories/api/v1/manufacturer/transformer/manufacturerTransformer");

/**
 * @swagger
 * /manufacturers/{id}:
 *   get:
 *     summary: Get manufacture by ID
 *     tags: [Manufacturer]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the manufacturer
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A manufacturer object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                 shortName:
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
 */
const getManufacturerById = async (req, res) => {
    try {
        const data = await manufacturerApiV1Repository.getManufacturerById(req);

        res.json( manufacturerTransformer(data.manufacturer) );
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    getManufacturerById,
};