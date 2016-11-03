/**
 * Created by ugo on 03/11/16.
 */

let seneca = require('seneca')();

seneca
    .use('./app/main')
    .listen()
    .client()

    .ready( () => {
        seneca.act('role:math, cmd:sum', {left: 1, right: 3}, (err,reply) => console.log(reply))
    });












/* var fs = require('fs')
 var spawn = require('child_process').spawn


 var services = ['web-app','user-details','offer-service']

 services.forEach(function(service){
 var log  = fs.createWriteStream('./log/'+service+'.log')
 var proc = spawn('node', ['./services/'+service+'.js','--seneca.log.all'])

 proc.stdout.pipe(log)
 proc.stderr.pipe(log)

 proc.stdout.pipe(process.stdout)
 proc.stderr.pipe(process.stderr)
 })

 */




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
