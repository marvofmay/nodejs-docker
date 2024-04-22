const productRepository = require('../../repositories/product/repository');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");

const productEdit = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await productRepository.getProductById(id);

        console.log('product.categories edit: ', product.categories);

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
            title: 'Edit product',
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: {},
        });

    } catch(err) {
        console.log(err);

        res.render('404error', {title: 'product not found'});
    }
}

module.exports = {
    productEdit,
}