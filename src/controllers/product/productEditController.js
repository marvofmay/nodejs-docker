const productRepository = require('../../repositories/product/repository');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const productEdit = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await productRepository.getProductById(productId);
        const categories = await categoryRepository.getAllCategoriesForSelectOptions();
        const categoriesForSelect = categories.map(category => ({
            _id: category._id,
            name: category.name
        }));

        const manufacturers = await manufacturerRepository.getAllManufacturersForSelectOptions();
        const manufacturersForSelect = manufacturers.map(manufacturer => ({
            _id: manufacturer._id,
            name: manufacturer.name
        }));

        res.render('products/edit', {
            product: product,
            title: 'Products',
            action: 'Edit product',
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    productEdit,
}