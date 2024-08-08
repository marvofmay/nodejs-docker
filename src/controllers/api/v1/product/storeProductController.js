const CreateProductDTO = require('../../../../dto/product/CreateProductDTO');
const { validationResult } = require('express-validator');
const ProductService = require('../../../../services/product/ProductService');
const categoryRepository = require("../../../../repositories/category/repository");
const manufacturerRepository = require("../../../../repositories/manufacturer/repository");
const CreatePhotoDTO = require('../../../../dto/photo/CreatePhotoDTO');
const PhotoService = require('../../../../services/photo/PhotoService');

const storeProduct = async (req, res) => {
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

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        let photos = [];
        if (req.files) {
            for (const { originalname, encoding, mimetype, buffer, size } of req.files) {
                const createPhotoDTO = new CreatePhotoDTO(originalname, encoding, mimetype, buffer, size);
                const createPhotoResult = await photoService.createPhoto(createPhotoDTO);
                photos.push(createPhotoResult.photoId);
            }
        }

        createProductDTO = new CreateProductDTO(req.body, photos);
        const createResult = await productService.createProduct(createProductDTO);

        return res.status(201).json({
            message: 'Product created successfully',
            product: createResult
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    storeProduct,
}