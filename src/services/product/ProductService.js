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
                return { success: true, message: 'Product saved successfully' };
            } else {
                return { success: false, message: 'Product not saved' };
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to create product');
        }
    }

    async updateProduct(updateProductDTO) {
        try {
            const productId = updateProductDTO._id;
            const newData = {
                name: updateProductDTO.name,
                description: updateProductDTO.description,
                ean: updateProductDTO.ean,
                price: updateProductDTO.price,
                vat: updateProductDTO.vat,
                bonusPercent: updateProductDTO.bonusPercent,
                manufacturer: updateProductDTO.manufacturer,
                categories: updateProductDTO.categories,
                photos: updateProductDTO.photos,
                active: updateProductDTO.active,
            };

            const result = await Product.updateOne({_id: productId}, {$set: newData});

            if (result.modifiedCount === 1) {
                return { success: true, message: 'Product updated successfully' };
            } else {
                return {success: false, message: 'Product not found or not updated'};
            }
        } catch (error) {
            console.error(error);

            throw new Error('Failed to update product');
        }
    }

    async deleteProduct (productId) {
        try {
            const result = await Product.findByIdAndDelete(productId, null);
            if (result) {
                return { success: true, message: 'Product deleted successfully.' };
            } else {
                return { success: false, message: 'Product not found.' };
            }
        } catch (err) {
            console.error(err);

            throw new Error('Failed to delete product.');
        }
    }
}

module.exports = ProductService;