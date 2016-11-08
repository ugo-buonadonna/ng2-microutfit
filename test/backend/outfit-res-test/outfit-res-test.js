"use strict";
process.env.NODE_ENV = 'test';


const request = require('supertest');
const should = require('should');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const faker = require('faker');
const promisify = require("es6-promisify");


function generateToken(id,secret) {
    var payload = {
        iss: 'my.domain.com',
        sub: id,
        iat: moment().unix(),
        exp: moment().add(7, 'days').unix()
    };
    return jwt.sign(payload, secret);
}

const seneca = require('seneca')()
    .use('basic')
    .use('entity')
    .use('mem-store')
    .use(require("../../../services/outfit-res/plugins/secret"));


describe('Outfit plugin test', () => {

    let usersAndTokens = [];


    const user_number = 2;                      // 2 minimum
    const outfits_per_user = 2;           // 2 minimum

    const u1 = new Promise( function(resolve, reject) {
        seneca
            .make('sys/user')
            .data$({name: '1'})
            .save$( (err,user) => {
                if(err) reject(err);
                resolve(user);
            });

    });


    const u2 = new Promise( function(resolve, reject) {
        seneca
            .make('sys/user')
            .data$({name: '2'})
            .save$( (err,user) => {
                if(err) reject(err);
                resolve(user);
            });

    });

    let o1 = (u) => {
        seneca
            .make('outfit')
            .data$({user: u.id})
            .save$( (err,user) => {
                if(err) reject(err);
                resolve(user);
            });
    }




    seneca
        .make('sys/user')
        .data$({name: '2'})
        .save$( (err,user) => {
            if(err) throw err;
            usersAndTokens.push({user: user})
        });








    /*
        let users = new Array(user_number);
        let savePromises = [];

        users.fill()
            .map(x => Object({
                id: faker.random.uuid()
            }) )
            .map(user => {
                user.outfits = [];
                let outfits = new Array(outfits_per_user);
                outfits.fill()
                    .map(x =>   seneca.make('outfit').data$({
                        user: user.id,
                        name: faker.lorem.word(),
                    }))
                    .map(lu => {
                        user.learningUnits.push(lu._id);
                        savePromises.push(lu.save());
                    });
                savePromises.push(user.save());
            });

        Promise.all(savePromises).then(saved => {

            usersAndTokens = saved.filter(x => x.email).map(user => new Object({
                user: user,
                token: jwt.sign({
                    iss: 'my.domain.com',
                    sub: user._id,
                    iat: moment().unix(),
                    exp: moment().add(7, 'days').unix()
                }, process.env.TOKEN_SECRET),
                lunitsPopulated: saved.filter(x => x.user === user._id)
            }));
            done();
        });*/



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



/*
describe('Outfit plugin test', () => {

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
*/
