const Routes = [{
    prefix: '/api/v1/outfit',
    pin: 'role:outfit,cmd:*',
    map: {
        create: {
            POST: true,
            secure: {
                fail: '/'
            },
        },
        read: {
            GET: true,
            suffix: '/{id}',
            secure: {
                fail: '/',
            }
        },
        list: {
            GET: true,
            secure: {
                fail: '/',
            }
        },
        update: {
            POST: true,
            suffix: '/{id}',
            secure: {
                fail: '/'
            }
        },
        delete: {
            DELETE: true,
            suffix: '/{id}',
            secure: {
                fail: '/'
            }
        }
    }
}]


module.exports = Routes;


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

