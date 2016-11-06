/**
 * Created by ugo on 05/11/16.
 */

/* eslint-env node,mocha */
var should = require('should');

describe('Dummy testing', function() {
    describe('Obvious assertion', function () {
        it('should pass', (done) => {
           Number(3).should.be.exactly(3);
            done();
        })
    })
})

