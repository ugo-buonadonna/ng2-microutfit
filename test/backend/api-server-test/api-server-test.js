"use strict";

process.env.NODE_ENV = 'test';

const should = require('should');
const server = require('../../../services/api-server/api-server'); //path to app.js or server.js
const request = require('supertest')(server);
const faker = require('faker');





describe('API tests', function () {
    let PersonModel, AccessTokenModel,OutfitModel,GarmentModel;
    let person1, accessToken1, person2, accessToken2, outfit1, outfit2, garment1, garment2;

    before(function () {
        PersonModel = server.models.person;
        AccessTokenModel = server.models.AccessToken;
        OutfitModel = server.models.outfit;
        GarmentModel = server.models.garment;
    });

    beforeEach('Seed DB',function (done) {

        let promises = [];

        promises.push(PersonModel.upsert({firstName:  faker.name.firstName()
            ,email: faker.internet.email()
            ,password: faker.internet.password()})
            .then( (p) => {
                person1 = p;
                return AccessTokenModel.upsert({'userId': p.id})
            })
            .then( (a) => {
                accessToken1 = a;
                return person1;
            }));


        promises.push(PersonModel.upsert({firstName:  faker.name.firstName()
            ,email: faker.internet.email()
            ,password: faker.internet.password()})
            .then( (p) => {
                person2 = p;
                return AccessTokenModel.upsert({'userId': p.id})
            })
            .then( (a) => {
                accessToken2 = a;
                return person2;
            }));

        promises.push(GarmentModel.upsert({name:  faker.lorem.word()})
            .then( (g) => {
                garment1 = g;
                return g;
            }));

        promises.push(GarmentModel.upsert({name:  faker.lorem.word()})
            .then( (g) => {
                garment2 = g;
                return g;
            }));


        promises.push(OutfitModel.upsert({name:  faker.lorem.word()})
            .then( (o) => {
                outfit1 = o;
                return o;
            }));


        promises.push(OutfitModel.upsert({name:  faker.lorem.word()})
            .then( (o) => {
                outfit2 = o;
                return o;
            }));


        Promise.all(promises).then( x => {
            let [u1,u2,g1,g2,o1,o2] = x;
            console.log(u1);

            u1.outfits = [Object.assign({},o1)];
            o1.people = [u1];
            o2.people = [u2];
            g1.outfits = [o1];
            g2.outfits = [o2];

            promises.push(PersonModel.upsert(u1));
            promises.push(PersonModel.upsert(u2));
            promises.push(OutfitModel.upsert(o1));
            promises.push(OutfitModel.upsert(o2));
            promises.push(GarmentModel.upsert(g1));
            promises.push(GarmentModel.upsert(g2));

            return Promise.all(promises);

        }).then(done)
            .catch((err) => {throw err});

/*
            promises.push(GarmentModel.upsert({name:  faker.lorem.word()})
                .then( (g) => {
                    garment1 = g;
                    return this;
                }


            promises.push(GarmentModel.upsert({firstName:  faker.name.firstName()
                ,email: faker.internet.email()
                ,password: faker.internet.password()})
                .then( (p) => {
                    person2 = p;
                    return AccessTokenModel.upsert({'userId': p.id})
                })
                .then( (a) => {
                    accessToken2 = a;
                    return this;
                }));
            for(i of Array(2).fill().map( (v,i) => i+1))
                OutfitModel.upsert({name:  faker.lorem.word(), people: [  [`person${i}`].id]})
                    .then( (o) => {
                        [`person${i}`].outfits = [o];
                    })
                    .then( (a) => {
                        accessToken2 = a;
                        return this;
                    });

        })*/


    });

    afterEach('Cleanup', function(done) {
       //PersonModel.destroyAll({});
      // AccessTokenModel.destroyAll({}, done);
    });

    describe('GET /api/people authorized', function() {
        it("Correctly get user's own identity", function (done) {
            request
                .get(`/api/people/${person.id}`)
                .set('Authorization',accessToken.id)
                .expect(200,done);
        });
    });

});
