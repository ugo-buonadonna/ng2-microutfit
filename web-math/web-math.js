/**
 * Created by ugo on 03/11/16.
 */
'use strict';

var Seneca = require('seneca');
var Web = require('seneca-web');
var Express = require('express');
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');

var Plugin = require('./plugins/math');
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
    options: { parseBody: false }
};

// Server and start as usual.

var seneca = Seneca()
    .use(Plugin)
    .use(Web, config)
    .ready(() => {
        var server = seneca.export('web/context')();

        server.listen('4000', (err) => {
            console.log(err || 'server started on: 4000')
        })
    });