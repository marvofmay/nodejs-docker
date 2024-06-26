const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Product = require('./product');

const photoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    originalFileName: {
        type: String,
        required: true,
    },
    encoding: {
        type: String,
        required: true,
    },
    mimeType: {
       type: String,
       required: true,
    },
    buffer: {
        type: Buffer,
        required: true,
    },
    size: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

photoSchema.post('findOneAndDelete', async function(doc) {
    await Product.updateMany({ photos: doc._id }, { $pull: { photos: doc._id } });
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;