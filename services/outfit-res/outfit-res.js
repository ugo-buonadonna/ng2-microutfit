'use strict';

var Seneca = require('seneca');
var Web = require('seneca-web');
var Express = require('express');
const jwt = require('jsonwebtoken');
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');
var methodOverride = require('method-override');
const Routes = require('./common/routes');
const secretPlugin = require('./plugins/secret');

// Prep express
var app = Express();
app.use(CookieParser());
app.use(BodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(BodyParser.json());

// The config we will pass to seneca-web
var config = {
    adapter: require('../../express-my-adapter/seneca-web-adapter-express-jwt'),
    context: app,
    routes: Routes,
    options: {
        secret: 'pluto',
        parseBody: false
    },
    auth: jwt
};

// Server and start as usual.

/* Passport.use(new Strategy((username, password, cb) => {
 Repo.users.findByUsername(username, (err, user) => {
 if (err) {
 cb(err)
 }
 else if (!user) {
 cb(null, false)
 }
 else if (user.password !== password) {
 cb(null, false)
 }
 else {
 cb(null, user)
 }
 })
 }))

*/
 var seneca = Seneca()
    .use("basic")
    .use("entity")
    .use("user")
    .use('mongo-store', {
         uri: 'mongodb://localhost:27017/micro'
     })
    .use(secretPlugin)
    .use(Web, config)

    .ready(() => {
        var server = seneca.export('web/context')();

        seneca.ready(function () {
          /*  seneca.act({
                    role: 'user',
                    cmd: 'register',
                    name: "Flann O'Brien",
                    email: 'nincompoop@deselby.com',
                    nick: 'TUTTMAIAL'
                    password: 'blackair'
                },
                function (err, out) {
                    console.log('ORA UN USER CI STE', out);
                })*/


            server.listen('4050', (err) => {
                console.log(err || 'server started on: 4050')
            })
        })
    })