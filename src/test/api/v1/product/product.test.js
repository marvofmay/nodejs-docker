const request = require('supertest');
const app = require('../../../../../app');
const mongoose = require('mongoose');
const Product = require('../../../../models/product');
const { MongoMemoryServer } = require('mongodb-memory-server')
let chai = null

describe('GET /api/v1/products/:id', () => {
    let mongoServer;
    let productId;

    before(async () => {
        chai = await import('chai');
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();

        await mongoose.connect(mongoUri);

        const product = new Product({
            name: 'Test Product',
            description: 'This is a test product',
            ean: '1234567890123',
            price: 100,
            vat: 23,
            bonusPercent: 5,
            manufacturer: mongoose.Types.ObjectId(),
            categories: [mongoose.Types.ObjectId()],
            photos: [mongoose.Types.ObjectId()],
            active: true,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        const savedProduct = await product.save();
        productId = savedProduct._id;
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('should return a product by id', (done) => {
        const { expect } = chai;
        request(app)
            .get(`/api/v1/products/${productId}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name', 'Test Product');
                done();
            });
    });

    it('should return 404 if product not found', (done) => {
        const { expect } = chai;
        const nonExistingId = mongoose.Types.ObjectId();
        request(app)
            .get(`/api/v1/products/${nonExistingId}`)
            .expect(404)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('error', 'Product not found');
                done();
            });
    });
});
