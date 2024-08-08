const CreateProductDTO = require('../../../../dto/product/CreateProductDTO');
const { validationResult } = require('express-validator');
const ProductService = require('../../../../services/product/ProductService');

const storeProduct = async (req, res) => {
    try {
        const productService = new ProductService();
        const errors = validationResult(req);
        const createProductDTO = new CreateProductDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Validation failed',
                success: false,
            });
        }
        const createResult = await productService.createProduct(createProductDTO);

        return res.status(201).json(createResult);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    storeProduct,
}