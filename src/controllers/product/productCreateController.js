const categoryRepository = require('../../repositories/category/repository');
const manufacturerRepository = require('../../repositories/manufacturer/repository');

const productCreate = async (req, res) => {

    try {
        const title = 'Products';
        const action = 'Create a new product';
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
            title: title,
            action: action,
            product: {},
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors : [],
            actionResult: {},
        });
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
}

module.exports = {
    productCreate,
}