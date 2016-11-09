/**
 * Created by ugo on 03/11/16.
 */
'use strict';

let seneca = require('seneca');
let express = require('express');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');

const Routes = require('./common/routes');

// Prep express
let app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// The config we will pass to senenpm runca-web
let config = {
    adapter: require('seneca-web-adapter-express'),
    context: app,
    routes: Routes,
    options: {
        parseBody: false
    }
};

// Server and start as usual.

seneca = seneca()
    .use(Plugin)
    .use(Web, config)
    .ready(() => {
        let server = seneca.export('web/context')();

        server.listen('4000', (err) => {
            console.log(err || 'server started on: 4000');
        });
    });
