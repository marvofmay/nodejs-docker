const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

describe('Products API', function() {
    this.timeout(10000); // Ustawienie timeoutu na 10 sekund

    it('should show the Home', function(done) {
        chai.request('http://localhost:3000') // Użycie aplikacji zamiast bezpośredniego adresu URL
            .get('/api/v1/products') // Testowanie endpointu z ID produktu
            .end((err, res) => {
                if (err) {
                    console.error('Request failed:', err);
                    done(err);
                } else {
                    res.should.have.status(200);
                    done();
                }
            });
    });
});
