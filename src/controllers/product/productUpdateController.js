const EditProductDTO = require('../../dto/product/EditProductDTO');
const { validationResult } = require('express-validator');
const categoryRepository = require("../../repositories/category/repository");
const manufacturerRepository = require("../../repositories/manufacturer/repository");
const ProductService = require('../../services/product/ProductService');
const PhotoService = require('../../services/photo/PhotoService');
const productRepository = require("../../repositories/product/repository");
const CreatePhotoDTO = require("../../dto/photo/CreatePhotoDTO");

const productUpdate = async (req, res) => {
    try {
        const errors = validationResult(req);
        let product = await productRepository.getProductById(req.params.id);
        const currentProductPhotos = product.photos;
        let editProductDTO = new EditProductDTO(req.body, currentProductPhotos);

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
                title: 'Edit product',
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

        for (const photo of currentProductPhotos) {
            photos.push(photo._id);
        }

        editProductDTO = new EditProductDTO(req.body, photos);
        const updateResult = await productService.updateProduct(editProductDTO);
        product = await productRepository.getProductById(req.params.id);

        return res.render('products/edit', {
            title: 'Edit product',
            product: product,
            categories: categoriesForSelect,
            manufacturers: manufacturersForSelect,
            errors: [],
            actionResult: updateResult,
        })

    } catch (err) {
        console.error(err);

        res.status(500).send('Internal Server Error :(');
    }
};

module.exports = {
    productUpdate,
}