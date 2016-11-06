/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let restricted_plugin = function (options) {

    this.add({role: 'restricted',cmd: 'getSecret', }, (msg, respond) => {
        console.log();
     });

 }

module.exports = restricted_plugin;