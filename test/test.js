const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

describe('Vehicles Service API calls', function() {
    describe('/GET /api/vehicles', function() {
        it('GET for all vehicles', function() {
            chai.request('http://localhost:3000')
                .get('/api/vehicles')
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.body.should.be.a('array').to.have.lengthOf(3);
                });
        });
    });
    
    describe('/GET /api/vehicles/:id', function() {
        it('GET for vehicles with id 1', function() {
            chai.request('http://localhost:3000')
                .get('/api/vehicles/1')
                .end(function(error, resp) {
                    resp.should.have.status(200);
                    resp.body.should.have.property('id').eql(1);
                    resp.body.should.have.property('modelo').eql('Palio');
                });
        });
    });
});