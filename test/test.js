const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.should();

chai.use(chaiHttp);

describe('Testiranje servera', function() {
    
    describe('GET', ()=> {
        it('GET /api/user', (done) => {
            chai.request(app)
            .get('/api/user')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('user_name');
                res.body[0].should.have.property('password');
                done();
            }); 
        });
        it('GET /api/failure', (done) => {
            chai.request(app)
            .get('/api/failure')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                done();
            }); 
        });
        it('GET /api/review', (done) => {
            chai.request(app)
            .get('/api/review')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('kind');
                done();
            }); 
        });
        it('GET /api/part', (done) => {
            chai.request(app)
            .get('/api/part')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('name');
                done();
            }); 
        });
        it('GET /api/vehicle', (done) => {
            chai.request(app)
            .get('/api/vehicle')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body[0].should.have.property('type');
                done();
            }); 
        });
    });



    
});