const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./address');

const manufacturerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    shortName: {
        type: String,
        required: false,
    },
    nip: {
        type: String,
    },
    regon: {
        type: String,
    },
    email: {
        type: String,
    },
    www: {
        type: String,
    },
    parentManufacturer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Manufacturer',
        required: false
    },
    address: {
        type:  Address.schema,
        default: {},
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const Manufacturer = mongoose.model('Manufacturer', manufacturerSchema);

module.exports = Manufacturer;