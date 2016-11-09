"use strict";

process.env.NODE_ENV = 'test';

const should = require('should');
const server = require('../../../services/api-server/api-server'); //path to app.js or server.js
const request = require('supertest')(server);
const faker = require('faker');
const Promise = require('bluebird');

var Person = server.models.Person;
const seedDB = require('./setup').seed;
const cleanDB = require('./setup').clean;


Promise.onPossiblyUnhandledRejection(function (error) {
    throw error;
});

describe('API tests', function () {
    let accessToken1, accessToken2;

    before('Seed DB', function (done) {
        seedDB().then(_ =>
            Promise.all([
                Person.login({email: 'test-user1@appirio.com', password: 'password'}).then((token) => {
                    accessToken1 = token.id;
                }),
                Person.login({email: 'test-user2@appirio.com', password: 'password'}).then((token) => {
                    accessToken2 = token.id;
                })
            ]))
            .then(_ => done()).catch(function (err) {
            throw err;
        });

    });

    after('Cleanup', function (done) {
        Promise.all([
            cleanDB(),
            Person.logout(accessToken1),
            Person.logout(accessToken2)
        ]).then(_ => done()).catch(function (err) {
            throw err;
        });
    });

    describe('GET /api/people', function () {

        describe('authenticated user', function () {
            it("should not get the list of users", function (done) {
                request
                    .get(`/api/people`)
                    .set('Authorization', accessToken1)
                    .expect(401, done);
            });


            it("should get user's own identity by ID", function (done) {
                request
                    .get(`/api/people/test-user1`)
                    .set('Authorization', accessToken1)
                    .expect(200, done);
            });

            it("should not get another user's identity by ID", function (done) {
                request
                    .get(`/api/people/test-user1`)
                    .set('Authorization', accessToken2)
                    .expect(401, done);
            });

            it("should get user's own outfit list", function (done) {
                request
                    .get(`/api/people/test-user1/outfits`)
                    .set('Authorization', accessToken1)
                    .expect(200)
                    .expect(res => {
                        console.log(res.body);
                    })
                    .end(done);
            });

            it("should not get another user's outfit list", function (done) {
                request
                    .get(`/api/people/test-user1/outfits`)
                    .set('Authorization', accessToken2)
                    .expect(401, done);
            });

        });
    });

    describe('GET /api/outfits', function () {

        describe('unauthenticated user', function () {
            it("should get all public outfits", function (done) {
                request
                    .get(`/api/outfits/public`)
                    .expect(200)
                    .expect( res => {
                        res.body.outfits.length.should.be.exactly(1);
                        res.body.outfits[0].id.should.eql('test-outfitpublic');
                    })
                    .end(done);
            });

        });

        describe('authenticated user', function () {
            it("should get all public outfits", function (done) {
                request
                    .get(`/api/outfits/public`)
                    .set('Authorization', accessToken1)
                    .expect( res => {
                        res.body.outfits.length.should.be.exactly(1);
                        res.body.outfits[0].id.should.eql('test-outfitpublic');
                    })
                    .end(done);
            });
            it.skip("should get user's own outfit by ID", function (done) {
                request
                    .get(`/api/outfits/test-outfit1`)
                    .set('Authorization', accessToken1)
                    .expect(200, done);
            });

            it.skip("should get user's own outfit's garments", function (done) {
                request
                    .get(`/api/outfits/test-outfit1/garments`)
                    .set('Authorization', accessToken1)
                    .expect(200, done);
            });

            it("should not get another user's outfit by ID", function (done) {
                request
                    .get(`/api/outfits/test-outfit1`)
                    .set('Authorization', accessToken2)
                    .expect(401, done);
            });

            it("should not get another user's own outfit's garments", function (done) {
                request
                    .get(`/api/outfits/test-outfit1/garments`)
                    .set('Authorization', accessToken2)
                    .expect(401, done);
            });

        });
    });


    describe('GET /api/garment', function () {

        describe('authenticated user', function () {
            it.skip("should get user's own garment by outfit", function (done) {
                request
                    .get(`/api/garments/test-garment1`)
                    .set('Authorization', accessToken1)
                    .expect(200, done);
            });

            it.skip("should get user's own outfit by ID having a given garment", function (done) {
                request
                    .get(`/api/garments/test-outfit1`)
                    .set('Authorization', accessToken1)
                    .expect(200, done);
            });

            it("should not get another user's outfit by ID having a given garment", function (done) {
                request
                    .get(`/api/garments/test-outfit3`)
                    .set('Authorization', accessToken1)
                    .expect(401, done);
            });

            it("should not get another user's outfits by ID", function (done) {
                request
                    .get(`/api/outfits/test-outfit1`)
                    .set('Authorization', accessToken2)
                    .expect(401, done);
            });
        })

    });


    /* describe('GET /api/outfits', function () {

     it("should get user's own outfits by user", function (done) {
     request
     .get(`/api/people/test-user1/outfits`)
     .set('Authorization', accessToken1)
     .expect(200, done);
     });

     it("should get user's own outfits by outfit", function (done) {
     request
     .get(`/api/outfits/test-outfit1`)
     .set('Authorization', accessToken1)
     .expect(200, done);
     });

     it("should not get another user's outfits by user", function (done) {
     request
     .get(`/api/people/test-user1/outfits`)
     .set('Authorization', accessToken2)
     .expect(401, done);
     });

     it("should not get another user's outfits by id", function (done) {
     request
     .get(`/api/outfits/test-outfit1`)
     .set('Authorization', accessToken2)
     .expect(401, done);
     });


     });*/


});


/*
 unit test = testo una funzione con tutto moccato
 integratino = testo più funzioni diverse insieme
 functional = testo "dato input x mi aspetto output y"
 e2e = il browser a finale


 */