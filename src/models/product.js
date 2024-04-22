const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    ean: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    vat: {
        type: Number,
        required: true,
    },
    bonusPercent: {
        type: Number,
        required: false,
    },
    manufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    }],
    photos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Photo',
        required: false,
    }],
    active: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;