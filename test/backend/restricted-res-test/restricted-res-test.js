
process.env.NODE_ENV = 'test';


let request = require('supertest');
let should = require('should');
let moment = require('moment');
let jwt = require('jsonwebtoken');

function generateToken() {
    var payload = {
        iss: 'my.domain.com',
        sub: 'userid:1',
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, 'pluto');
}

let s = require('../../../services/restricted-res/restricted-res');

describe('API test with authorization', () => {

    const not_authorized_error_code = 500;
    const request_url = "http://localhost:4050";

    beforeEach('Populate database',function(done) {
        done();
    });

    afterEach('Clear database', function(done) {
            done();
    });

    describe('GET /user/v1/learningUnits', function() {
        this.timeout(5000);

        it("Shouldn't get anything if not authenticated", (done) => {

            setTimeout( () => {
                request(request_url)
                    .get('/api/v1/restricted/getSecret')
                    .expect(302,done)

            },2000);


        });

        it.only("Should get protected resource with correct token", (done) => {

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


    });
})

