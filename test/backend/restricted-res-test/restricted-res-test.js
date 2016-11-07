
process.env.NODE_ENV = 'test';


let request = require('supertest');
let should = require('should');
let moment = require('moment');
let jwt = require('jsonwebtoken');

function generateToken() {
    var payload = {
        iss: 'my.domain.com',
        sub: '581fb15196f7f53da34f7096',
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, 'pluto');
}

let s = require('../../../services/outfit-res/outfit-res');


describe('API test with authorization', () => {

    const not_authorized_error_code = 500;
    const request_url = "http://localhost:4050";

    beforeEach('Populate database',function(done) {

        done();
    });

    afterEach('Clear database', function(done) {
            done();
    });

    describe('GET /api/v1/restricted/getSecret', function() {
        this.timeout(8000);

        it("Shouldn't get anything if not authenticated", (done) => {

            setTimeout( () => {
                request(request_url)
                    .get('/api/v1/restricted/getSecret')
                    .expect(302,done)

            },2000);


        });

        it("Should get protected resource with correct token", function(done) {
            setTimeout( () => {
                request(request_url)
                    .get('/api/v1/restricted/getSecret')
                    .set('Authorization',`Bearer ${generateToken()}`)
                    .expect(200)
                    .expect( res => {
                        console.log('EVABE');
                    })
                    .end( err => {
                        if (err) throw err;
                    });
            },2000);
        });
        it.only("should create a new outfit", function(done) {
            setTimeout( () => {


                    request(request_url)
                        .post('/api/v1/outfit/create')
                        .set('Authorization',`Bearer ${generateToken()}`)
                        .send({ name: 'Manny', species: 'cat' })
                        .expect(200)
                        .expect( res => {
                            console.log('ma prova', res);
                            done();
                        })
                        .end( err => {
                            if (err) throw err;
                        });

            },2000);
            })



    });
})

