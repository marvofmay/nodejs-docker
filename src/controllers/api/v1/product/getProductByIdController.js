const productApiV1Repository = require('../../../../repositories/api/v1/product/repository');
const productTransformer = require("../../../../repositories/api/v1/product/transformer/productTransformer");
const {isNull} = require("lodash/lang");


/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Name of the product
 *           example: "Product 2"
 *         description:
 *           type: string
 *           description: Description of the product
 *           example: ""
 *         ean:
 *           type: integer
 *           description: EAN (European Article Number)
 *           example: 1234567890128
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 *           example: 9.99
 *         vat:
 *           type: integer
 *           description: VAT percentage
 *           example: 7
 *         bonusPercent:
 *           type: integer
 *           description: Bonus percentage
 *           example: 0
 *         active:
 *           type: boolean
 *           description: Indicates if the product is active
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was created
 *           example: "2024-08-05 10:23:02"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was last updated
 *           example: "2024-08-05 10:23:02"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was deleted (if applicable)
 *           example: null
 *     ProductNotFound:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Product not found"
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Internal server error"
 * /products/{id}:
 *   get:
 *     summary: Retrieve a product by ID
 *     description: Retrieve detailed information about a product by its ID.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the product to retrieve
 *         schema:
 *           type: string
 *           example: "66b0a641780d8c36c467f52d"
 *     responses:
 *       200:
 *         description: Product retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Product not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductNotFound'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getProductById = async (req, res) => {
    try {
        let product = await productApiV1Repository.getProductById(req);
        if (product === null) {
            res.status(400).json({
                message: 'Product not found'
            });
        } else {
            product = productTransformer(product);
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
}

module.exports = {
    getProductById,
};