const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Address = require('./address');

const userSchema = new Schema({
    login: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: false
    },
    lastName: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    address: {
        type: Address.schema,
        required: false
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'user'],
        required: true,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date,
        default: null
    },
});

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    this.set({ updatedAt: Date.now() });
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
