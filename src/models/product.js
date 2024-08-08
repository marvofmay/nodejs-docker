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
        required: true,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
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
        required: false,
    },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;