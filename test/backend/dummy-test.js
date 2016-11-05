/**
 * Created by ugo on 05/11/16.
 */

/* eslint-env node,mocha */
var should = require('should');
var main = require('../../init.js');

describe('Dummy testing', function() {
    describe('Obvious assertion', function () {
        it('pass', (done) => {
           main(1,2).should.be.exactly(3);
            done();
        })
    })
})

