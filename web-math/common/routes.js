
/*
var Routes = [{
    pin: 'role:admin,cmd:*',
    prefix: '/v1',
    postfix: '/?param=true',
    map: {
        home: {
            GET: true,
            POST: true,
            alias: '/home'
        },
        logout: {
            GET: true,
            redirect: '/'
        },
        profile: {
            GET: true,
            autoreply: false
        },
        login: {
            POST: true,
            auth: {
                strategy: 'local',
                pass: '/profile',
                fail: '/'
            }
        }
    }
}]*/


/*
var Routes = [{
    pin: 'role:api,cmd:*',
    prefix: '/api',
    map: {
        getData: {
            GET: true
        }
    }
}];*/

const Routes = [{
    prefix: '/api/v1/math',
    pin: 'role:math,cmd:*',
    map: {
        sum: {POST: true}
    }
}];


/* const Routes = [{
 prefix: '/api/v1/animals',
 pin: 'role:animals,cmd:*',
 map: {
 read: {name: '', GET: true, suffix: '/{id}'},
 list: {name: '', GET: true},
 create: {name: '', POST: true},
 update: {name: '', POST: true, suffix: '/{id}'},
 delete: {name: '', 'DELETE': true, suffix: '/{id}'}
 }
 }];
 Should allow you to get, e.g.

 GET /api/v1/animals/{id} -- read
 GET /api/v1/animals -- list
 POST /api/v1/animals -- create
 POST /api/v1/animals/{id} -- update
 DELETE /api/v1/animals/{id} -- delete
 */

module.exports = Routes;
