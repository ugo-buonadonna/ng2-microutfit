/**
 * Created by ugo on 03/11/16.
 */

var Seneca = require('seneca');
var Web = require('seneca-web');
var Express = require('express');
var CookieParser = require('cookie-parser');
var BodyParser = require('body-parser');

const Routes = require('./common/routes');

// Prep express
var app = Express();

app.use(CookieParser());
app.use(BodyParser.urlencoded({extended: true}));

// The config we will pass to seneca-web
var config = {
    adapter: require('seneca-web-adapter-express'),
    context: app,
    routes: Routes
};

// Server and start as usual.

var seneca = Seneca()
    .use(Web, config)
        .use("basic")
        .use("entity")
        .use('mongo-store', {
        uri: 'mongodb://localhost:27017/micro'
    })
    .ready(() => {
        var server = seneca.export('web/context')();

        server.listen('4001', (err) => {
            console.log(err || 'server started on: 4001');
        });

        /*var apple = seneca.make$('fruit');
        apple.name  = 'Pink Lady';
        apple.price = 0.99;
        apple.save$(function (err,apple) {
            console.log( "apple.id = "+apple.id  )
        })*/
    });