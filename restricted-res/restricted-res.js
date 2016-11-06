/**
 * Created by ugo on 03/11/16.
 */
'use strict';

var Seneca = require('seneca');
var Web = require('seneca-web');/*
var Basic = require('seneca-basic');
var Entity = require('seneca-entity');*/
var Express = require('express');
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');

var Plugin = require('./plugins/secret');
const Routes = require('./common/routes');

// Prep express
var app = Express();

app.use(CookieParser());
app.use(BodyParser.urlencoded({extended: true}));
app.use(BodyParser.json());

// The config we will pass to seneca-web
var config = {
    adapter: require('seneca-web-adapter-express'),
    context: app,
    routes: Routes,
    options: {parseBody: false}
};

// Server and start as usual.


var seneca = Seneca()
    .use('basic')
    .use('entity')
    .use('user')
   /* .use('seneca-auth', {
    default_plugins: { authTokenCookie: false }
    })*/
    .use('jwt', {
        key: 'superPassword'
    })
    //.use(Plugin)
    //.use(Web, config)
    //.client({pin: 'role:user,cmd:*'})
    .ready(function () {
        /*
        var server = seneca.export('web/context')();

        server.listen('4000', (err) => {
            console.log(err || 'server started on: 4000')
        })
        */
      console.log("ready");
      /*  this.act({role: 'user', cmd: 'register',nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true},
            (err,done) => console.log('here!!',done.user))*/
    });

/*
var u = seneca.pin({role: 'user', cmd: '*'});
u.register({nick: 'u1', name: 'nu1', email: 'u1@example.com', password: 'u1', active: true}, () => console.log('we'));
u.register({nick: 'u2', name: 'nu2', email: 'u2@example.com', password: 'u2', active: true});
u.register({nick: 'a1', name: 'na1', email: 'a1@example.com', password: 'a1', active: true, admin: true});*/