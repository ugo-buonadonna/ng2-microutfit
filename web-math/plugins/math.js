/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let math_plugin = function math(options) {


    // Default options
    options = this.util.deepextend({
        color: 'red',
        box: {
            width:  100,
            height: 200
        }
    },options);

    this.add({cmd: "sum", role: "math"}, (msg, respond) => {
        let left = Number(msg.args.body.left);
        let right = Number(msg.args.body.right);

        if(isNaN(left) || isNaN(right))
            respond(null, {status: 'err',answer: 'invalid numbers provided'});
         else
         respond(null, {status: 'ok',answer: left+right});
     });

     //return 'pluginName';
 }

module.exports = math_plugin;