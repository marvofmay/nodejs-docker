const CreateProductDTO = require('../../../../dto/product/CreateProductDTO');
const { validationResult } = require('express-validator');
const ProductService = require('../../../../services/product/ProductService');
const categoryRepository = require("../../../../repositories/category/repository");
const manufacturerRepository = require("../../../../repositories/manufacturer/repository");
const CreatePhotoDTO = require('../../../../dto/photo/CreatePhotoDTO');
const PhotoService = require('../../../../services/photo/PhotoService');

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     description: Adds a new product to the system, including its details and optional associated photos.
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         description: The name of the product.
 *         required: true
 *         example: "Product 11"
 *       - in: formData
 *         name: description
 *         type: string
 *         description: A brief description of the product.
 *         required: false
 *         example: "Description of Product 11"
 *       - in: formData
 *         name: ean
 *         type: integer
 *         description: The EAN (European Article Number) of the product.
 *         required: true
 *         example: 5677637550267
 *       - in: formData
 *         name: price
 *         type: number
 *         format: float
 *         description: The price of the product.
 *         required: true
 *         example: 12
 *       - in: formData
 *         name: vat
 *         type: number
 *         format: float
 *         description: The VAT percentage for the product.
 *         required: true
 *         example: 23
 *       - in: formData
 *         name: bonusPercent
 *         type: number
 *         format: float
 *         description: The bonus percentage applied to the product.
 *         required: false
 *         example: 10
 *       - in: formData
 *         name: manufacturer
 *         type: string
 *         description: The ID of the manufacturer.
 *         required: true
 *         example: "66b07a9381cc43419f1ef856"
 *       - in: formData
 *         name: categories
 *         type: array
 *         items:
 *           type: string
 *         description: List of category IDs associated with the product.
 *         required: true
 *         example: ["66b0a52c780d8c36c467f514", "66b08e5be6b7d0ab8547ce71"]
 *       - in: formData
 *         name: photos
 *         type: file
 *         description: Optional image files for the product.
 *         required: false
 *         example: (file)
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *                   example: true
 *                 message:
 *                   type: string
 *                   description: A message providing more details about the result.
 *                   example: "Product saved successfully"
 *                 product:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the newly created product.
 *                       example: "66b4c25b82885e399231f6dc"
 *                     name:
 *                       type: string
 *                       description: The name of the product.
 *                       example: "Product 11"
 *                     description:
 *                       type: string
 *                       description: A brief description of the product.
 *                       example: "Description of Product 11"
 *                     ean:
 *                       type: integer
 *                       description: The EAN of the product.
 *                       example: 5677637550267
 *                     price:
 *                       type: number
 *                       format: float
 *                       description: The price of the product.
 *                       example: 12
 *                     vat:
 *                       type: number
 *                       format: float
 *                       description: The VAT percentage for the product.
 *                       example: 23
 *                     bonusPercent:
 *                       type: number
 *                       format: float
 *                       description: The bonus percentage applied to the product.
 *                       example: 10
 *                     manufacturer:
 *                       type: string
 *                       description: The ID of the manufacturer.
 *                       example: "66b07a9381cc43419f1ef856"
 *                     categories:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of category IDs associated with the product.
 *                       example: ["66b0a52c780d8c36c467f514", "66b08e5be6b7d0ab8547ce71"]
 *                     photos:
 *                       type: array
 *                       items:
 *                         type: string
 *                       description: List of photo IDs associated with the product.
 *                       example: ["66b4c25b82885e399231f6d8", "66b4c25b82885e399231f6da"]
 *                     active:
 *                       type: boolean
 *                       description: Indicates if the product is active.
 *                       example: false
 *                     deletedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the product was deleted.
 *                       example: null
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the product was created.
 *                       example: "2024-08-08T13:04:27.490Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The date and time when the product was last updated.
 *                       example: "2024-08-08T13:04:27.490Z"
 *                     __v:
 *                       type: integer
 *                       description: Version key for the product.
 *                       example: 0
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       msg:
 *                         type: string
 *                       param:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
const storeProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        const categoriesFromDB = await categoryRepository.getAllCategoriesForSelectOptions();
        const categoriesForSelect = categoriesFromDB.map(category => ({
            _id: category._id,
            name: category.name
        }));
        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));
        let createProductDTO = new CreateProductDTO(req.body);
        const productService = new ProductService();
        const photoService = new PhotoService();

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let photos = [];
        if (req.files) {
            for (const { originalname, encoding, mimetype, buffer, size } of req.files) {
                const createPhotoDTO = new CreatePhotoDTO(originalname, encoding, mimetype, buffer, size);
                const createPhotoResult = await photoService.createPhoto(createPhotoDTO);
                photos.push(createPhotoResult.photoId);
            }
        }

        createProductDTO = new CreateProductDTO(req.body, photos);
        const createResult = await productService.createProduct(createProductDTO);

        return res.status(201).json(createResult);

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    storeProduct,
}