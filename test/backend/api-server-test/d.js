"use strict";

process.env.NODE_ENV = 'test';

const should = require('should');
const app = require('../../../services/api-server/api-server'); //path to app.js or server.js
const request = require('supertest')(app);
const faker = require('faker');
const Promise = require('bluebird');

var Person = app.models.Person;
var Outfit = app.models.Outfit;
var Garment = app.models.Garment;




Promise.onPossiblyUnhandledRejection(function (error) {
    throw error;
});

describe('API tests', function () {
    let accessToken1, accessToken2;
    let a;
    let login
    before('adf',function(done)  {
        console.log('pazzzi');
        Person.create([
            {id: 'p1',firstName: 'John', email: 'john@doe.com', password: 'opensesame'}

        ], function (err, users) {
            if (err) console.error(err);
            a = users[0];
            users[0].outfits.create([
                {name: 'mona',id: 'o1'},
            ], function (err, outfits) {
                if (err) throw err;
                Person.login({email: 'john@doe.com', password: 'opensesame'}, function(err,tojen) {
                    login = tojen.id
                    done();
                })

            })
        })
    })
    after('clean', function(done) {
        Promise.all([Person.destroyAll(),Outfit.destroyAll()].then( _ => done()))
    });


    describe('aeee', function() {

            it("should not get the list of users", function (done) {
                request
                    .get(`/api/people/p1`)
                    .set('Authorization', login)
                    .expect(200, done);
            });

        it("should not get the lsddsf users", function (done) {
            request
                .get(`/api/people/p1/outfits`)
                .set('Authorization', login)
                .expect(200)
                .expect(x => {
                    console.log(x.body);
                })
                .end(done);
        });

        it("should not get the lsddsf userees", function (done) {
            request
                .get(`/api/outfits/o1`)
                .set('Authorization', login)
                .expect(200)
                .expect(x => {
                    console.log(x.body);
                })
                .end(done);
        });

        it("should eeers", function (done) {
            request
                .get(`/api/people`)
                .set('Authorization', login)
                .expect(401, done);
        });
        })



})


/*
 unit test = testo una funzione con tutto moccato
 integratino = testo più funzioni diverse insieme
 functional = testo "dato input x mi aspetto output y"
 e2e = il browser a finale


 */