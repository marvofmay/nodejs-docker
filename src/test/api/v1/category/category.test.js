const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Authentication and Category Test', function() {
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

    it('should create a new category', function(done) {
        agent
            .post('/api/v1/categories')
            .send({ name: 'New Category' })
            .end((err, res) => {
                if (err) {
                    console.error('Request failed:', err);
                    return done(err);
                }
                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('success').that.is.a('boolean').and.equals(true);
                res.body.should.have.property('message').that.is.a('string').and.equals('Category saved successfully.');
                res.body.should.have.property('category').that.is.an('object');
                res.body.category.should.have.property('name').that.is.a('string').and.equals('New Category');
                res.body.category.should.have.property('_id').that.is.a('string');
                res.body.category.should.have.property('createdAt').that.is.a('string');
                res.body.category.should.have.property('updatedAt').that.is.a('string');
                res.body.category.should.have.property('__v').that.is.a('number');
                res.body.category.should.have.property('deletedAt').that.is.null;

                done();
            });
    });

    it('should not allow duplicate category names', function(done) {
        agent
            .post('/api/v1/categories')
            .send({ name: 'New Category' })
            .end((err, res) => {
                if (err) {
                    console.error('Request failed:', err);
                    return done(err);
                }
                res.should.have.status(400);
                res.body.should.be.an('object');
                res.body.should.have.property('errors').that.is.an('array').with.lengthOf(1);
                res.body.errors[0].should.have.property('msg').that.is.a('string').and.equals('Category name already exists');
                res.body.errors[0].should.have.property('path').that.is.a('string').and.equals('name');

                done();
            });
    });
});
