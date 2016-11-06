
process.env.NODE_ENV = 'test';


let request = require('supertest');
let should = require('should');
let moment = require('moment');
let jwt = require('jsonwebtoken');

let s = require('../../../services/restricted-res/restricted-res')
describe('API test with authorization', () => {

    const not_authorized_error_code = 500;
    const request_url = "http://localhost:4000";

    beforeEach('Populate database',function(done) {
        done();
    });

    afterEach('Clear database', function(done) {
            done();
    });

    describe('GET /user/v1/learningUnits', () => {

        it.only("Can't get anything if not authenticated", (done) => {
            setTimeout( () => {
                request(request_url)
                    .get('/api/v1/restricted/getSecret')
                    .expect(not_authorized_error_code)
                    .expect(_ => {
                        Number(1).should.not.be.exactly(1);
                    })
                    .end((err, res) => {
                        if (err) throw err;
                    });


            },2000);


        });


    });
})

