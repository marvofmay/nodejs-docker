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
 *           example: "Manufacturer marked as deleted successfully."
 *         status:
 *           type: integer
 *           description: HTTP status code of the response
 *           example: 200
 *       required:
 *         - success
 *         - message
 *         - status
 *     DeleteManufacturerResponse200:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: true
 *           message: "Manufacturer marked as deleted successfully"
 *           status: 200
 *     DeleteManufacturerResponse400:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: false
 *           message: "Manufacturer not found"
 *           status: 400
 *     DeleteManufacturerResponse500:
 *       type: object
 *       properties:
 *         actionResult:
 *           $ref: '#/components/schemas/ActionResult'
 *       required:
 *         - actionResult
 *       example:
 *         actionResult:
 *           success: false
 *           message: "Failed to delete manufacturer"
 *           status: 500
 * /manufacturers:
 *   delete:
 *     summary: Delete a manufacturer
 *     description: Deletes a manufacturer by its ID.
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
 *                 example: "66b08e5be6b7d0ab8547ce71"
 *             required:
 *               - id
 *     responses:
 *       200:
 *         description: Manufacturer successfully marked as deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteManufacturerResponse200'
 *       400:
 *         description: Bad Request - Manufacturer not found or invalid request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteManufacturerResponse400'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/DeleteManufacturerResponse500'
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
