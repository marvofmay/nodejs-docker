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
        const product = await productRepository.getProductById(id);

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

        let editProductDTO = new EditProductDTO(req.body);
        const productService = new ProductService();
        const photoService = new PhotoService();

        if (! errors.isEmpty()) {
            return res.render('products/edit', {
                title: 'Edit a new product',
                product: editProductDTO,
                categories: categoriesForSelect,
                manufacturers: manufacturersForSelect,
                errors: errors.array(),
                actionResult: {},
            });
        }

        let photos = [];
        for (const { originalname, encoding, mimetype, buffer, size } of req.files) {
            const createPhotoDTO = new CreatePhotoDTO(originalname, encoding, mimetype, buffer, size);
            const createPhotoResult = await photoService.createPhoto(createPhotoDTO);
            photos.push(createPhotoResult.photoId);
        }

        editProductDTO = new EditProductDTO(req.body, photos);
        const createResult = await productService.createProduct(editProductDTO);

        return res.render('products/edit', {
            title: 'Update product',
            product: {},
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: createResult,
        })
    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error :(');
    }
};

module.exports = {
    productUpdate,
}