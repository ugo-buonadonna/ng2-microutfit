'use strict';

var Seneca = require('seneca');
var Web = require('seneca-web');
var Express = require('express');
var Passport = require('passport');
var Strategy = require('passport-jwt').Strategy;
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');
var methodOverride = require('method-override');
const Routes = require('./common/routes');


// The config for our routes


// Plugin to handle our routes
function Plugin() {
    var seneca = this;

    seneca.add('role:admin,cmd:home', (msg, done) => {
        done(null, {ok: true, message: 'please log in...'})
    });

    seneca.add('role:admin,cmd:logout', (msg, done) => {
        msg.request$.logout();

        done(null, {ok: true})
    });

    seneca.add('role:admin,cmd:profile', (msg, done) => {
        done(null, {ok: true, user: msg.args.user})
    })
}

// Set our custom strategy in passport, plus user serialization.
Passport.use(new JwtStrategy({
    secretOrKey: 'secret',
    issuer: 'my.domain.com',
    jwtFromRequest: (req) => (req.headers.authorization && req.headers.authorization.split(' ')[1]) || req.cookies.token
}, (jwt_payload, done) => {
    User.findOne({id: jwt_payload.sub}, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    })
}));

// Prep express
var app = Express();
app.use(CookieParser());
app.use(BodyParser.urlencoded({extended: true}));
app.use(methodOverride);
app.use(BodyParser.json());
app.use(Passport.initialize());

// The config we will pass to seneca-web
var config = {
    adapter: require('seneca-web-adapter-express'),
    context: app,
    routes: Routes,
    auth: Passport
};

// Server and start as usual.

var seneca = Seneca()
    .use(Plugin)
    .use(Web, config)
    .ready(() => {
        var server = seneca.export('web/context')();

        server.listen('4050', (err) => {
            console.log(err || 'server started on: 4050')
        })
    });