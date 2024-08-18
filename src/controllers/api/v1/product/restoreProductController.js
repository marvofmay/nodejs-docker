const RestoreProductDTO = require('../../../../dto/product/RestoreProductDTO');
const ProductService = require('../../../../services/product/ProductService');
const { validationResult} = require("express-validator");


const restoreProduct = async (req, res) => {
    try {
        const errors = validationResult(req);
        const productService = new ProductService();
        const restoreProductDTO = new RestoreProductDTO(req.body);

        if (! errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: 'Validation failed',
                errors: errors.array()
            });
        }
        const restoreResult = await productService.restoreProduct(restoreProductDTO);

        return res.status(restoreResult.status).json(restoreResult);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

module.exports = {
    restoreProduct,
}