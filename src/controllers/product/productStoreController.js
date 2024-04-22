const CreateProductDTO = require('../../dto/product/CreateProductDTO');
const CreatePhotoDTO = require('../../dto/photo/CreatePhotoDTO');
const { validationResult } = require('express-validator');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");
const ProductService = require('../../services/product/ProductService');
const PhotoService = require('../../services/photo/PhotoService');

const productStore = async (req, res) => {
    try {
        const errors = validationResult(req);
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
        let createProductDTO = new CreateProductDTO(req.body);
        const productService = new ProductService();
        const photoService = new PhotoService();

        if (! errors.isEmpty()) {
            return res.render('products/create', {
                title: 'Create a new product',
                product: createProductDTO,
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

        createProductDTO = new CreateProductDTO(req.body, photos);
        const createResult = await productService.createProduct(createProductDTO);

        return res.render('products/create', {
            title: 'Create a new product',
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
    productStore,
}