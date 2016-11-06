/**
 * Created by ugo on 05/11/16.
 */

const should = require('should');

describe('Dummy testing', function() {
    describe('Obvious assertion', function() {
        it('should pass', function(done) {
            should.exist(Number(1));
            done();
        });
    });
});

