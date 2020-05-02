const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
chai.should();

chai.use(chaiHttp);

describe('Testiranje servera', function() {
    let part = {id:69,name: 'Brisaci'} 
    let review = { id:69,state:"zavrsen", kind: "redovni", responsible_person:2, vehicle:2 }
    let failure = { id:69, name: "mjenjac", vehicle: 2 } 
    let user = {
        id:69,
        first_name: "Miki",
        last_name: "Mustafic",
        position: "administrator",
        jmbg: "88855582313",
        birth_date: "1.1.2002",
        adress: "Bakije 12",
        zip_code: "71000",
        mail: "Mikica@gmail.com",
        phone_number: "061-333-221",
        user_name: "muki",
        password: "miki"
    }
    let vehicle = { owner_name: "John",brand: "BMV",type: "putnicko",
            serial_number: "999412",production_year: 2020,date_of_use: '1.1.2020',previous_inspection: '3.3.2020'};
    
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
                res.should.be.json;
                res.body[0].should.have.property('kind');
                done();
            }); 
        });
        it('GET /api/part', (done) => {
            chai.request(app)
            .get('/api/part')
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
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
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('type');
                done();
            }); 
        });
    });

    describe('POST', ()=> {
        it('POST /api/user', (done) => {
            chai.request(app)
            .post('/api/user')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('user_name');
                res.body.should.have.property('password');
                done();
            }); 
        });
        it('POST /api/failure', (done) => {
            chai.request(app)
            .post('/api/failure')
            .send(failure)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            }); 
        });
        it('POST /api/part', (done) => {
             
            chai.request(app)
            .post('/api/part')
            .send(part)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                done();
            }); 
        });
        it('POST /api/review', (done) => {
            chai.request(app)
            .post('/api/review')
            .send(review)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('responsible_person');
                res.body.should.have.property('vehicle');
                done();
            }); 
        });
        it('POST /api/vehicle', (done) => {
            
            chai.request(app)
            .post('/api/vehicle')
            .send(vehicle)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('owner_name');
                res.body.should.have.property('type');
                done();
            }); 
        });
    });

    describe('/DELETE/:id ', () => {
        
        it('it should DELETE a user given the id', (done) => {
            chai.request(app)
            .delete('/api/user/' + user.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('Deleted!');
                done();
            });
        });
        it('it should DELETE a vehicle given the id', (done) => {
            chai.request(app)
            .delete('/api/vehicle/' + vehicle.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('Deleted!');
                done();
            });
        });
        it('it should DELETE a part given the id', (done) => {
            chai.request(app)
            .delete('/api/part/' + part.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('Deleted!');
                done();
            });
        });
        it('it should DELETE a failure given the id', (done) => {
            chai.request(app)
            .delete('/api/failure/' + failure.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('Deleted!');
                done();
            });
        });
        it('it should DELETE a review given the id', (done) => {
            chai.request(app)
            .delete('/api/review/' + review.id)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql('Deleted!');
                done();
            });
        });



    });




});