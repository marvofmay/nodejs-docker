const DateUtility = require('../../../../../utility/DateUtility');

const productTransformer = (product, withCategories = false, withManufacturer = false, withPhotos = false) => {
    const data = {
        id: product._id,
        name: product.name,
        description: product.description,
        ean: product.ean,
        price: product.price,
        vat: product.vat,
        bonusPercent: product.bonusPercent,
        active: product.active,
        createdAt: DateUtility.formatDateYmdHis(product.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(product.updatedAt),
        deletedAt: product.deletedAt ? DateUtility.formatDateYmdHis(product.deletedAt) : null,
    };

    if (withManufacturer) {
        data.manufacturer = {};
    }
    if (product.manufacturer) {
        data.manufacturer = {
            id: product.manufacturer._id,
            name: product.manufacturer.name
        };
    }

    if (withCategories) {
        data.categories = [];
    }
    if (product.categories && product.categories.length > 0) {
        data.categories = product.categories.map(category => ({
            id: category._id,
            name: category.name,
            description: category.description
        }));
    }

    if (withPhotos) {
        data.photos = [];
    }
    if (product.photos && product.photos.length > 0) {
        data.photos = product.photos.map(photo => ({
            id: photo._id,
            title: photo.title,
            description: photo.description,
            encoding: photo.encoding,
            mimeType: photo.mimeType,
            buffer: photo.buffer,
        }));
    }

    return data;
};

module.exports = productTransformer;