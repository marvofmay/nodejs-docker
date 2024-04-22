const EditProductDTO = require('../../dto/product/EditProductDTO');
const CreatePhotoDTO = require('../../dto/photo/CreatePhotoDTO');
const { validationResult } = require('express-validator');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");
const ProductService = require('../../services/product/ProductService');
const PhotoService = require('../../services/photo/PhotoService');
const productRepository = require("../../repositories/product/repository");

const productUpdate = async (req, res) => {
    try {
        const errors = validationResult(req);
        let editProductDTO = new EditProductDTO(req.body);
        const product = await productRepository.getProductById(editProductDTO._id);

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

        const productService = new ProductService();
        const photoService = new PhotoService();


        console.log('editProductDTO.categories update', editProductDTO.categories);

        if (! errors.isEmpty()) {
            return res.render('products/edit', {
                title: 'Edit product',
                product: editProductDTO,
                categories: categoriesForSelect,
                manufacturers: manufacturersForSelect,
                errors: errors.array(),
                actionResult: {},
            });
        }

    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error :(');
    }
};

module.exports = {
    productUpdate,
}