const DateUtility = require('../../../../../utility/DateUtility');

const productTransformer = (product) => {

    return {
        id: product._id,
        name: product.name,
        description: product.description,
        ean: product.ean,
        price: product.price,
        vat: product.vat,
        bonusPercent: product.bonusPercent,
        manufacturer: product.manufacturer ? {
            id: product.manufacturer._id,
            name: product.manufacturer.name
        } : null,
        categories: product.categories ? product.categories.map(category => ({
            id: category._id,
            name: category.name,
            description: category.description
        })) : [],
        photos: product.photos ? product.photos.map(photo => ({
            id: photo._id,
            title: photo.title,
            url: `/photos/${photo._id}`
        })) : [],
        active: product.active,
        createdAt: DateUtility.formatDateYmdHis(product.createdAt),
        updatedAt: DateUtility.formatDateYmdHis(product.updatedAt),
        deletedAt: product.deletedAt ? DateUtility.formatDateYmdHis(product.deletedAt) : null,
    };
};

module.exports = productTransformer;