const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addressSchema = new Schema({
    street: {
        type: String,
    },
    zipcode: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
}, {
    _id: false,
    timestamps: false,
});

const Address = mongoose.model(
    'Address', addressSchema);

module.exports = Address;