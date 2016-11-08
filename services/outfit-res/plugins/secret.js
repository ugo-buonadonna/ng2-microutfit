/**
 * Created by ugo on 03/11/16.
 */
"use strict";



// var plugin = function name1( options )
let outfit_plugin = function (options) {

    function getUserContext(cb) {
    }
    this.add({role: 'outfit',cmd: 'create'}, (msg, respond) => {
        msg.request$.checkBody('name', 'Outfit must have a name').notEmpty();
        msg.request$.assert('user','No valid userID in request').notEmpty();
        let errors = req.validationErrors();

        if (errors) return respond(errors);

        let outfit_entity = this.make('outfit');
        let user_entity = this.make('sys/user');
        Object.assign(outfit_entity,msg.request$.body);
        console.log(`saving`,outfit_entity);

        user_entity.load$(msg.request$.user, (err,user) => {
            if(err) respond(err);
            if(!user) respond(Error('User entity not found'));
            user.outfits = user.outfits | [];
            user.save$((err,user) => {
                if(err) respond(err);
                outfit_entity.user = user.id;
                outfit_entity.save$(respond);
            })
        })

     });


    this.add({role: 'outfit',cmd: 'read'}, (msg, respond) => {
        msg.request$.checkParams('id', 'An ID must be specified').notEmpty();
        msg.request$.assert('user','No valid userID in request').notEmpty();
        let errors = req.validationErrors();

        if (errors) return respond(errors);

        this.make('outfit').list$({id: msg.request$.params.id,user: msg.request$.user},respond);
    });



    this.add({role: 'outfit',cmd: 'list'}, (msg, respond) => {
        msg.request$.checkParams('id', 'An ID must be specified').notEmpty();
        msg.request$.assert('user','No valid userID in request').notEmpty();
        let errors = req.validationErrors();

        if (errors) return respond(errors);

        this.make('outfit').list$({user: msg.request$.user}, respond);
    });




    this.add({role: 'outfit',cmd: 'update'}, (msg, respond) => {
        msg.request$.checkParams('id', 'An ID must be specified').notEmpty();
        msg.request$.assert('user','No valid userID in request').notEmpty();
        let errors = req.validationErrors();

        if (errors) return respond(errors);

        this.make('outfit').list$({id: msg.request$.params.id,user: msg.request$.user},
            (err,outfit) => {
                console.log('outfit found: ');
            });
    });




    this.add({role: 'outfit',cmd: 'delete'}, (msg, respond) => {
        msg.request$.checkParams('id', 'An ID must be specified').notEmpty();
        msg.request$.assert('user','No valid userID in request').notEmpty();
        let errors = req.validationErrors();

        if (errors) return respond(errors);


        this.make('outfit').list$({id: msg.request$.params.id,user: msg.request$.user},
            (err,outfit) => {
                console.log('outfit found: ');
            });
    });
 }

module.exports = outfit_plugin;