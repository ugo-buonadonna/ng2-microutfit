/**
 * Created by ugo on 05/11/16.
 */

const should = require('should');

const seneca = require('seneca')()
    .use('../../web-math/plugins/math.js');


describe('Math plugin testing', function() {
    describe('Sum', function () {
        it('sums correctly two numbers', function(done) {
            seneca.act('role:math,cmd:sum',{left:3,right:5},function(err,out){
                if(err) done(err);
                console.log(`WE ZZIO`,out);
                out.answer.should.exist();
                out.answer.should.be.exactly(8);
                done();
            })
        })
    })
})

