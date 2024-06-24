const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = "mongodb://root:example@mongo:27017/?authSource=admin";
        await mongoose.connect(dbURI);
        console.log('Connected to MongoDB...');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

module.exports = connectDB;