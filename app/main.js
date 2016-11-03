/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let plugin1 = function plugin1(options) {


    // Default options
    options = this.util.deepextend({
        color: 'red',
        box: {
            width:  100,
            height: 200
        }
    },options);

    this.add({cmd: "sum", role: "math"}, (msg, respond) => {
         let sum = msg.left + msg.right;
         respond(null, {answer: sum});
     });

     //return 'pluginName';
 }

 let plugin = function () {
     var seneca = this;

     seneca.add('role:api,cmd:getData', (msg, done) => {
         done(null, {ok: true, message: 'Data you got'})
     })

 }
module.exports = plugin;