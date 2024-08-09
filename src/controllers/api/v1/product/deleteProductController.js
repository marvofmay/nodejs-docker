const ProductService = require('../../../../services/product/ProductService');

/**
 * @swagger
 * /products:
 *   delete:
 *     summary: Delete a product
 *     description: Marks a product as deleted by setting a deletion timestamp. The product is not fully removed from the database but is marked as deleted.
 *     tags:
 *       - Products
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
 *                 description: The ID of the product to delete.
 *                 example: "66b4c25b82885e399231f6dc"
 *     responses:
 *       200:
 *         description: Product marked as deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actionResult:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Indicates if the operation was successful.
 *                       example: true
 *                     message:
 *                       type: string
 *                       description: A message providing more details about the operation.
 *                       example: "Product marked as deleted successfully"
 *                     status:
 *                       type: integer
 *                       description: HTTP status code.
 *                       example: 200
 *       400:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actionResult:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Indicates if the operation was successful.
 *                       example: false
 *                     message:
 *                       type: string
 *                       description: A message providing more details about the error.
 *                       example: "Product not found"
 *                     status:
 *                       type: integer
 *                       description: HTTP status code.
 *                       example: 400
 *       500:
 *         description: Failed to delete product
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actionResult:
 *                   type: object
 *                   properties:
 *                     success:
 *                       type: boolean
 *                       description: Indicates if the operation was successful.
 *                       example: false
 *                     message:
 *                       type: string
 *                       description: A message providing more details about the error.
 *                       example: "Failed to delete product"
 *                     status:
 *                       type: integer
 *                       description: HTTP status code.
 *                       example: 500
 */
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.body;
        const productService = new ProductService();
        const deleteResult = await productService.deleteProduct(id);

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
    deleteProduct,
};
