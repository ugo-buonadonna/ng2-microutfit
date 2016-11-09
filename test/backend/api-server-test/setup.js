/**
 * Created by ugo on 09/11/16.
 */

"use strict";

const app = require('../../../services/api-server/api-server');
var Person = app.models.Person;
var Outfit = app.models.Outfit;
var Garment = app.models.Garment;

var createPeopole = function () {
    return new Promise(function (resolve, reject) {
        Person.create([
            {
                id: 'test-user1',
                firstName: 'test-user1',
                email: 'test-user1@appirio.com',
                password: 'password',
                outfits: ['test-outfit1', 'test-outfit3']
            },
            {
                id: 'test-user2',
                firstName: 'test-user2',
                email: 'test-user2@appirio.com',
                password: 'password',
                outfits: ['test-outfit2', 'test-outfit3']
            }
        ], function (err, records) {
            if (err) reject(err);
            if (!err) resolve(records);
        });
    });
};

var createOutfits = function (persons) {
    return new Promise(function (resolve, reject) {
        Outfit.create([
            {
                id: 'test-outfit1',
                name: 'Test Outfit One',
                people: ['test-user1'],
                garments: ['test-garment1', 'test-garment2']
            },
            {
                id: 'test-outfit2',
                name: 'Test Outfit Two',
                people: ['test-user2'],
                garments: ['test-garment3', 'test-garment4']
            },
            {
                id: 'test-outfit3',
                name: 'Test Outfit Three',
                people: ['test-user1', 'test-user2'],
                garments: ['test-garment1', 'test-garment4']
            },
            {
                id: 'test-outfitpublic',
                name: 'Test Outfit Public',
                public: true
            }
        ], function (err, records) {
            if (err) reject(err);
            if (!err) resolve(records);
        });
    });
};

var createGarments = function (outfits) {
    return new Promise(function (resolve, reject) {
        Garment.create([
            {
                "name": "This is my 1 garment",
                "id": "test-garment1",
                "outfits": ['test-outfit1', 'test-outfit3']
            },
            {
                "name": "This is my 2 garment",
                "id": "test-garment2",
                "outfits": ['test-outfit1']
            },
            {
                "name": "This is my 3 garment",
                "id": "test-garment3",
                "outfits": ['test-outfit2']
            },
            {
                "name": "This is my 4 garment",
                "id": "test-garment4",
                "outfits": ['test-outfit3']
            }
        ], function (err, records) {
            if (err) reject(err);
            if (!err) resolve(records);
        });
    });
};

module.exports.seed = function () {
    return Promise.all([createGarments(), createOutfits(), createPeopole()])
};

module.exports.clean = function () {
    return Promise.all([Outfit.destroyAll(),
        Person.destroyAll(),
        Garment.destroyAll()]);

};
