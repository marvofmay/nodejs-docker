const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Products API without authorization', function () {
    this.timeout(1000);
    it('should return products', function(done) {
        chai.request('http://localhost:3000')
            .get('/api/v1/products')
            .end((err, res) => {
                if (err) {
                    console.error('Request failed:', err);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total').that.is.a('number');
                    res.body.should.have.property('page').that.is.a('number');
                    res.body.should.have.property('totalPages').that.is.a('number');
                    res.body.should.have.property('products').which.is.an('array');

                    res.body.products.forEach((product) => {
                        product.should.be.an('object');
                        product.should.have.property('id').that.is.a('string');
                        product.should.have.property('name').that.is.a('string');
                        product.should.have.property('description').that.is.a('string');
                        product.should.have.property('ean').that.is.a('number');
                        product.should.have.property('price').that.is.a('number');
                        product.should.have.property('vat').that.is.a('number');
                        product.should.have.property('bonusPercent').that.is.a('number');
                        product.should.have.property('active').that.is.a('boolean');
                        product.should.have.property('createdAt').that.is.a('string');
                        product.should.have.property('updatedAt').that.is.a('string');
                        product.should.have.property('deletedAt').that.satisfy((val) => val === null || typeof val === 'string');
                    });

                    done();
                }
            });
    });

    it('should return products with categories and photos', function(done) {
        chai.request('http://localhost:3000')
            .get('/api/v1/products?categories=true&photos=true')
            .end((err, res) => {
                if (err) {
                    console.error('Request failed:', err);
                    done(err);
                } else {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('total').that.is.a('number');
                    res.body.should.have.property('page').that.is.a('number');
                    res.body.should.have.property('totalPages').that.is.a('number');
                    res.body.should.have.property('products').which.is.an('array');

                    res.body.products.forEach((product) => {
                        product.should.be.an('object');
                        product.should.have.property('id').that.is.a('string');
                        product.should.have.property('name').that.is.a('string');
                        product.should.have.property('description').that.is.a('string');
                        product.should.have.property('ean').that.is.a('number');
                        product.should.have.property('price').that.is.a('number');
                        product.should.have.property('vat').that.is.a('number');
                        product.should.have.property('bonusPercent').that.is.a('number');
                        product.should.have.property('active').that.is.a('boolean');
                        product.should.have.property('createdAt').that.is.a('string');
                        product.should.have.property('updatedAt').that.is.a('string');
                        product.should.have.property('deletedAt').that.satisfy((val) => val === null || typeof val === 'string');
                        product.should.have.property('manufacturer').that.is.an('object');
                        product.manufacturer.should.have.property('id').that.is.a('string');
                        product.should.have.property('categories').that.is.an('array');
                        product.categories.forEach((category) => {
                            category.should.be.an('object');
                            category.should.have.property('id').that.is.a('string');
                            category.should.have.property('name').that.is.a('string');
                            category.should.have.property('description').that.is.a('string');
                        });
                        product.should.have.property('photos').that.is.an('array');
                    });

                    done();
                }
            });
    });
});

describe('Authentication and Product Test', function() {
    this.timeout(1000);
    let agent = chai.request.agent('http://localhost:3000');

    before(function(done) {
        agent
            .post('/login')
            .send({ login: 'test@example.com', password: 'myPassword123$%&' })
            .end((err, res) => {
                if (err) {
                    console.error('Login request failed:', err);
                    return done(err);
                }
                res.should.have.status(200);

                agent
                    .get('/api/v1/sessions/authenticated')
                    .end((err, res) => {
                        if (err) {
                            console.error('Request failed:', err);
                            return done(err);
                        }

                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.should.have.property('isAuthenticated').that.is.a('boolean');
                        res.body.isAuthenticated.should.equal(true);

                        done();
                    });
            });
    });

    it('should create a new product', function(done) {
        // ToDo: Get Manufacturer and Categories and store Product
    });

});
