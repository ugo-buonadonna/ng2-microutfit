/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let outfit_plugin = function (options) {
    this.add({role: 'outfit',cmd: 'create'}, (msg, respond) => {
        let outfit_entity = this.make('outfit');
        Object.assign(outfit_entity,msg.request$.body);
        console.log(`saving`,outfit_entity);
        outfit_entity.save$( (err,res) => {
            if(err) throw err;
            console.log('salvato!: ',res);
            respond(null,res);
        });
     });
 }

module.exports = outfit_plugin;