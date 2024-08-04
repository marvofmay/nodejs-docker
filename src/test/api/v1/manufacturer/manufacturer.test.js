const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Authentication and Manufacturer Test', function() {
    let agent = chai.request.agent('http://localhost:3000');
    let token = '';

    const newManufacturer = {
        "name": "New Manufacturer",
        "shortName": "New M",
        "nip": "7620701723",
        "regon": "534808332",
        "www": "http://manufacturer1.com",
        "email": "manufacturer1@example.com",
        "address": {
            "street": "Mazowiecka 2",
            "zipcode": "12-123",
            "city": "Warszawa",
            "country": "Poland"
        }
    }

    before(function(done) {
        agent
            .post('/api/v1/sessions/login')
            .send({ login: 'test@example.com', password: 'myPassword123$%&' })
            .end((err, res) => {
                if (err) {
                    console.error('Login request failed:', err);

                    return done(err);
                }
                res.should.have.status(200);
                res.body.should.have.property('actionResult');
                res.body.actionResult.should.have.property('user');
                res.body.actionResult.user.should.have.property('token');
                token = res.body.actionResult.user.token;

                done();
            });
    });

    it('should create a new manufacturer', function(done) {
        agent
            .post('/api/v1/manufacturers')
            .set('Authorization', `Bearer ${token}`)
            .send(newManufacturer)
            .end(function(err, res) {
                if (err) {
                    console.error('Login request failed:', err);

                    return done(err);
                }

                res.should.have.status(201);
                res.body.should.be.an('object');
                res.body.should.have.property('success').that.is.a('boolean').and.equals(true);
                res.body.should.have.property('message').that.is.a('string').and.equals('Manufacturer saved successfully.');

                done();
            });
    });

});

