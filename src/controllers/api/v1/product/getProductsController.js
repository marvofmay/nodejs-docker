const productApiV1Repository = require('../../../../repositories/api/v1/product/repository');
const productTransformer = require('../../../../repositories/api/v1/product/transformer/productTransformer');

/**
 * @swagger
 * components:
 *   schemas:
 *     Manufacturer:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Manufacturer ID
 *           example: "66b07a9381cc43419f1ef856"
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Category ID
 *           example: "66b08e5be6b7d0ab8547ce71"
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Product ID
 *           example: "66b0a641780d8c36c467f52d"
 *         name:
 *           type: string
 *           description: Name of the product
 *           example: "Product 1"
 *         description:
 *           type: string
 *           description: Description of the product
 *           example: "Description of product 1"
 *         ean:
 *           type: integer
 *           description: EAN (European Article Number)
 *           example: 5803352818140
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the product
 *           example: 19.99
 *         vat:
 *           type: integer
 *           description: VAT percentage
 *           example: 23
 *         bonusPercent:
 *           type: integer
 *           description: Bonus percentage
 *           example: 10
 *         active:
 *           type: boolean
 *           description: Indicates if the product is active
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was created
 *           example: "2024-08-05 10:15:29"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was last updated
 *           example: "2024-08-05 10:15:29"
 *         deletedAt:
 *           type: string
 *           format: date-time
 *           description: Date and time when the product was deleted (if applicable)
 *           example: null
 *         manufacturer:
 *           $ref: '#/components/schemas/Manufacturer'
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *     ProductsResponse:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: Total number of products
 *           example: 2
 *         page:
 *           type: integer
 *           description: Current page number
 *           example: 1
 *         totalPages:
 *           type: integer
 *           description: Total number of pages
 *           example: 1
 *         products:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Product'
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *           description: Error message
 *           example: "Internal server error"
 * /products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieves a list of products with optional query parameters for filtering and customization. Returns detailed information about the products.
 *     tags:
 *       - Products
 *     parameters:
 *       - name: manufacturer
 *         in: query
 *         description: Whether to include manufacturer details in the response
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *       - name: categories
 *         in: query
 *         description: Whether to include category details in the response
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *       - name: photos
 *         in: query
 *         description: Whether to include product photos in the response
 *         required: false
 *         schema:
 *           type: boolean
 *           example: true
 *     responses:
 *       200:
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProductsResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
const getProducts = async (req, res) => {
    try {
        const data = await productApiV1Repository.getProducts(req.query);
        let { manufacturer, categories, photos} = req.query;
        manufacturer = manufacturer === 'true';
        categories = categories === 'true';
        photos = photos === 'true';

        data.products = data.products.map(product => productTransformer(product, categories, manufacturer, photos));

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getProducts,
};