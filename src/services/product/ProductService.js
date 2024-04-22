const Product = require('../../models/product');

class ProductService {
    async createProduct(createProductDTO) {
        try {
            const product = new Product({
                name: createProductDTO.name,
                description: createProductDTO.description,
                ean: createProductDTO.ean,
                price: createProductDTO.price,
                vat: createProductDTO.vat,
                bonusPercent: createProductDTO.bonusPercent,
                manufacturer: createProductDTO.manufacturer,
                categories: createProductDTO.categories,
                photos: createProductDTO.photos,
                active: createProductDTO.active,
            });
            const result = await product.save();

            if (result) {
                return { success: true, message: 'Product saved successfully.' };
            } else {
                return { success: false, message: 'Product not saved.' };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create product.');
        }
    }
}

module.exports = ProductService;