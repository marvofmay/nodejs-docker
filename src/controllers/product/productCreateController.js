const categoryRepository = require('../../repositories/category/repository');
const manufacturerRepository = require('../../repositories/manufacturer/repository');

const productCreate = async (req, res) => {

    try {
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

        res.render('products/create', {
            title: 'Create a new product',
            product: {},
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors : [],
            actionResult: {},
        });
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    productCreate,
}