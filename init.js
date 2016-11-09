/**
 * Created by ugo on 03/11/16.
 */
/*
 let seneca = require('seneca')();

 seneca
 .use('./app/main')
 .listen()
 .client()
 .ready( () => {
 seneca.act('role:math, cmd:sum', {left: 1, right: 3},
 (err,reply) => console.log(reply))
 });
 */

/* "use strict"; // use the http://expressjs.com web framework
 const express        = require('express');
 const bodyParser     = require('body-parser');
 const cookieParser   = require('cookie-parser');
 const methodOverride = require('method-override');

 // setup the configuration
 const conf = {
 port:  3000
 };


 // create a seneca instance
 const seneca  = require('seneca')();

 // use the example plugins
 // they are all sub folders
 seneca.use('./app/main');

 // set up express
 const app = express();
 app.use(cookieParser());
 app.use(express.query());
 app.use(bodyParser.urlencoded({extended: true}))
 app.use(methodOverride());
 app.use(bodyParser.json());

 // this is the top level static content
 app.use(express.static(__dirname + '/public'));

 // add in the seneca middleware
 // this is how the seneca plugins can respond to HTTP requests
 app.use( require('seneca-web') );


 // start the app!
 app.listen(conf.port);



 */
/*
 'use strict';

 var Seneca = require('seneca');
 var Web = require('seneca-web');
 var Express = require('express');
 var CookieParser = require('cookie-parser');
 var BodyParser = require('body-parser');

 var Plugin = require('./app/main');
 const Routes = require('./app/routes');

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
 .use(Plugin)
 .use(Web, config)
 .ready(() => {
 var server = seneca.export('web/context')();

 server.listen('4000', (err) => {
 console.log(err || 'server started on: 4000')
 })
 });*/

/*
 'use strict';
 const fs = require('fs');
 const spawn = require('child_process').spawn;


 const services = ['web-math'];


 services.map((service) => {

 fs.mkdir('./logs',(err) => {
 if(err.code !== 'EEXIST')
 throw err;

 const log  = fs.createWriteStream('./logs/'+service+'.log');

 const proc = spawn('node', ['./'+service+'/'+service+'.js']);

 log.on('open', _ => {
 proc.stdout.pipe(log);
 proc.stderr.pipe(log);

 proc.stdout.pipe(process.stdout);
 proc.stderr.pipe(process.stderr);
 })
 });

 });
 */
'use strict';

const server = require('./services/api-server/api-server');
const faker = require('faker');

const Outfit = server.models.Outfit;
let pendings = [];

module.exports = (x, y) => x+y;

Outfit.create([
    {
        season: 'summer',
        year: 2016,
        name: 'Il furbo',
        imageURL: 'assets/outfit1.jpg',
        public: true
    },
    {
        season: 'winter',
        year: 2016,
        name: 'Il modaiolo',
        imageURL: 'assets/outfit2.jpg',
        public: true
    },
    {
        season: 'spring',
        year: 2016,
        name: 'Zante',
        imageURL: 'assets/outfit3.jpg',
        public: true
    }
])
.then( (outfits) => {
    outfits.map( o => {
        for (let i of Array(3))
            pendings.push(o.garments.create({name: faker.lorem.word()+i}));
    });
});


/*
 var SOME_CONFIG = process.env.SOME_CONFIG || 'some-default-value'

 require('seneca')({ some_options: 123 })

 // existing Seneca plugins
 .use('community-plugin-0')
 .use('community-plugin-1', {some_config: SOME_CONFIG})
 .use('community-plugin-2')

 // your own plugins with your own business logic
 .use('project-plugin-module')
 .use('../plugin-repository')
 .use('./lib/local-plugin')

 .listen( ... )
 .client( ... )

 .ready( function() {
 // your own custom code - executed once Seneca is spun up
 })

 */
