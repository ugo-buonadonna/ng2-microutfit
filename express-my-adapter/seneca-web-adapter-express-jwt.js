'use strict'

const _ = require('lodash')
const ReadBody = require('./read-body')

// This adapter handles routes for express and can authorise using
// passport.js. See ./docs/examples/secure-express.js for more info.
module.exports = function express (options, context, auth, routes, done) {
  const seneca = this
  if (!context) {
    return done(new Error('no context provided'))
  }

  // Routes have methods as an array, we need
  // to loop once per route, per method to get
  // all of the routes correctly.
  _.each(routes, (route) => {
    _.each(route.methods, (method) => {
      // lowercase the method so we can use it
      // ala server[method] aka server.get()
      method = _.toLower(method)

      // There are 2 individual handlers depending
      // on if the route is secure, or not.
      // Each is explained below.
      if (!route.secure) {
        unsecuredRoute(seneca, options, context, method, route)
      }
      else {
        securedRoute(seneca, options, context, method, route, auth)
      }
    })
  })

  return done(null, {routes: routes})
}

// All routes ultimately get handled by this handler
// if they have not already be redirected or responded.
function handleRoute (seneca, options, request, reply, route, next) {
  if (options.parseBody) { return ReadBody(request, finish) }
  finish(null, request.body || {})

  // Express requires a body parser to work in production
  // This util creates a body obj without neededing a parser
  // but doesn't impact loading one in.
  function finish (err, body) {
    if (err) {
      return next(err)
    }

    // This is what the seneca handler will get
    // Note! request$ and response$ will be stripped
    // if the message is sent over transport.
    const payload = {
      request$: request,
      response$: reply,
      args: {
        body: body,
        route: route,
        params: request.params,
        query: request.query,
        user: request.user || null
      }
    }

    // Call the seneca action specified in the config
    seneca.act(route.pattern, payload, (err, response) => {
      if (err) {
        return next(err)
      }

      // Redirect or reply depending on config.
      if (route.redirect) {
        return reply.redirect(route.redirect)
      }
      if (route.autoreply) {
        return reply.send(response)
      }
    })
  }
}

// Unsecured routes just call the handler directly, no magic.
function unsecuredRoute (seneca, options, context, method, route) {
  context[method](route.path, (request, reply, next) => {
    handleRoute(seneca, options, request, reply, route, next)
  })
}

//Secured route checks for token existance. If the token is correctly verified, the resouce can be
//Returned. Auth must be a jsonwebtoken instance
function securedRoute (seneca, options, context, method, route, auth) {
  context[method](route.path, (request, reply, next) => {
    request.isAuthenticated = function () {
      var token = (request.headers.authorization && request.headers.authorization.split(' ')[1]) || request.cookies.token;
      try {
        return auth.verify(token, options.secret);
      } catch (err) {
        return false;
      }
    };

    if (request.isAuthenticated()) {
       // ATTACH USER TO REQUEST
      request.user ={
        id: '123',
        name: 'NICULA'
      }
    } else {
      return reply.redirect(route.secure.fail)
    }

    handleRoute(seneca, options, request, reply, route, next)
  })
}
