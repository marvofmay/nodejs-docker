const ManufacturerService = require('../../../../services/manufacturer/ManufacturerService');

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     DeleteResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful
 *           example: true
 *         message:
 *           type: string
 *           description: A message about the result of the delete operation
 *           example: 'Manufacturer marked as deleted successfully'
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *           example: 200
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful
 *           example: false
 *         message:
 *           type: string
 *           description: A message about the result of the delete operation
 *           example: 'Failed to delete manufacturer'
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *           example: 500
 * /manufacturers:
 *   delete:
 *     summary: Delete or mark a manufacturer as deleted
 *     description: Deletes a manufacturer by ID
 *     tags:
 *       - Manufacturers
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
 *                 description: The ID of the manufacturer to delete
 *                 example: "66af7de14ae3695a0655cf4"
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Manufacturer successfully marked as deleted or deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const deleteManufacturer = async (req, res) => {
    try {
        const { id } = req.body;
        const manufacturerService = new ManufacturerService();
        const deleteResult = await manufacturerService.deleteManufacturer(id);

        if (deleteResult.error) {
            res.status(deleteResult.status).json({actionResult: deleteResult});
        } else {
            res.status(deleteResult.status).json({actionResult: deleteResult});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    deleteManufacturer,
};
