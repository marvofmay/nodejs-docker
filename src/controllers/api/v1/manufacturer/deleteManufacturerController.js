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
 *         message:
 *           type: string
 *           description: A message about the result of the delete operation
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *       required:
 *         - success
 *         - message
 *         - status
 *       example:
 *         success: true
 *         message: 'Manufacturer marked as deleted successfully.'
 *         status: 200
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Indicates whether the operation was successful
 *         message:
 *           type: string
 *           description: A message about the result of the delete operation
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *       required:
 *         - success
 *         - message
 *         - status
 *       example:
 *         success: false
 *         message: 'Failed to delete Manufacturer.'
 *         status: 500
 * /manufacturers:
 *   delete:
 *     summary: Delete or mark a manufacturer as deleted
 *     description: Deletes a manufacturer by ID. If `safe` is set to true, it will mark the manufacturer as deleted by setting the `deletedAt` field to the current date, instead of actually deleting it.
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
 *     responses:
 *       200:
 *         description: Manufacturer successfully marked as deleted or deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteResponse'
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
