const CreateManufacturerDTO = require('../../../../dto/manufacturer/CreateManufacturerDTO');
const { validationResult } = require('express-validator');
const ManufacturerService = require('../../../../services/manufacturer/ManufacturerService');

/**
 * @swagger
 * components:
 *   schemas:
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           example: "Mazowiecka 2"
 *         zipcode:
 *           type: string
 *           example: "12-123"
 *         city:
 *           type: string
 *           example: "Warszawa"
 *         country:
 *           type: string
 *           example: "Poland"
 *     Manufacturer:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Manufacturer name
 *           example: "Manufacturer 1"
 *         shortName:
 *           type: string
 *           description: Short name of the manufacturer
 *           example: "M 1"
 *         nip:
 *           type: string
 *           description: NIP (tax identification number)
 *           example: "7620701723"
 *         regon:
 *           type: string
 *           description: REGON (statistical number)
 *           example: "534808332"
 *         www:
 *           type: string
 *           description: Manufacturer website
 *           example: "http://manufacturer1.com"
 *         email:
 *           type: string
 *           description: Manufacturer email
 *           example: "manufacturer1@example.com"
 *         parentManufacturer:
 *           type: string
 *           description: Parent manufacturer ID
 *           example: "66b07a9381cc43419f1ef856"
 *         address:
 *           $ref: '#/components/schemas/Address'
 *       required:
 *         - name
 *         - nip
 *         - regon
 *   responses:
 *     ManufacturerCreated:
 *       description: Manufacturer created successfully
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               success:
 *                 type: boolean
 *                 example: true
 *               message:
 *                 type: string
 *                 example: "Manufacturer saved successfully"
 *               manufacturer:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: "Manufacturer 2"
 *                   shortName:
 *                     type: string
 *                     example: "M 2"
 *                   nip:
 *                     type: string
 *                     example: "9526715082"
 *                   regon:
 *                     type: string
 *                     example: "596281282"
 *                   email:
 *                     type: string
 *                     example: "manufacturer2@example.com"
 *                   www:
 *                     type: string
 *                     example: "http://manufacturer2.com"
 *                   parentManufacturer:
 *                     type: string
 *                     example: "66b07a9381cc43419f1ef856"
 *                   address:
 *                     $ref: '#/components/schemas/Address'
 *                   deletedAt:
 *                     type: string
 *                     example: null
 *                   _id:
 *                     type: string
 *                     example: "66b07b5c81cc43419f1ef85a"
 *                   createdAt:
 *                     type: string
 *                     example: "2024-08-05T07:12:28.732Z"
 *                   updatedAt:
 *                     type: string
 *                     example: "2024-08-05T07:12:28.732Z"
 *                   __v:
 *                     type: integer
 *                     example: 0
 *     ValidationError:
 *       description: Validation failed
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               errors:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     type:
 *                       type: string
 *                       example: "field"
 *                     value:
 *                       type: string
 *                       example: "9526715082"
 *                     msg:
 *                       type: string
 *                       example: "Manufacturer with this NIP already exists"
 *                     path:
 *                       type: string
 *                       example: "nip"
 *                     location:
 *                       type: string
 *                       example: "body"
 *               message:
 *                 type: string
 *                 example: "Validation failed"
 *               success:
 *                 type: boolean
 *                 example: false
 *     ServerError:
 *       description: Internal server error
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Internal server error"
 *               success:
 *                 type: boolean
 *                 example: false
 * /manufacturers:
 *   post:
 *     summary: Create a new manufacturer
 *     description: Create a new manufacturer with the provided details.
 *     tags:
 *       - Manufacturers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manufacturer'
 *     responses:
 *       201:
 *         $ref: '#/components/responses/ManufacturerCreated'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */

const storeManufacturer = async (req, res) => {
    try {
        const manufacturerService = new ManufacturerService();
        const errors = validationResult(req);
        const createManufacturerDTO = new CreateManufacturerDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation failed',
                success: false,
            });
        }
        const createResult = await manufacturerService.createManufacturer(createManufacturerDTO);

        return res.status(201).json(createResult);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    storeManufacturer,
}