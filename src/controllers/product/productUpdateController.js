const UpdateProductDTO = require('../../dto/product/UpdateProductDTO');
const { validationResult } = require('express-validator');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");
const ProductService = require('../../services/product/ProductService');
const PhotoService = require('../../services/photo/PhotoService');
const productRepository = require("../../repositories/product/repository");
const CreatePhotoDTO = require("../../dto/photo/CreatePhotoDTO");

const productUpdate = async (req, res) => {
    try {
        const title = 'Products';
        const action = 'Edit product';
        const errors = validationResult(req);
        let product = await productRepository.getProductById(req.params.id);
        const currentProductPhotos = product.photos;
        let updateProductDTO = new UpdateProductDTO(req.body, currentProductPhotos);

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

        if (! errors.isEmpty()) {
            return res.render('products/edit', {
                title: title,
                action: action,
                product: updateProductDTO,
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

        for (const photo of currentProductPhotos) {
            photos.push(photo._id);
        }

        updateProductDTO = new UpdateProductDTO(req.body, photos);
        const updateResult = await productService.updateProduct(updateProductDTO);
        product = await productRepository.getProductById(req.params.id);

        return res.render('products/edit', {
            title: title,
            action: action,
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            product: product,
            errors: [],
            actionResult: updateResult,
        })
    } catch(error) {
        res.render('error/error', {title: 'error', message: error.message});
    }
};

module.exports = {
    productUpdate,
}