const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Wczytaj odpowiedni plik .env na podstawie NODE_ENV
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;
dotenv.config({ path: envFile });

const connectDB = async () => {
    try {
        const dbName = process.env.MONGO_DB_NAME || 'development';
        const dbURI = `mongodb://root:example@mongo:27017/${dbName}?authSource=admin`;

        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to MongoDB (${dbName})...`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
    }
};

module.exports = connectDB;