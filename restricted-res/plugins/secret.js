/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let math_plugin = function math(options) {

    this.add({cmd: "sum", role: "math"}, (msg, respond) => {
        respond(null,'The secret is: 23');
     });

 }

module.exports = math_plugin;