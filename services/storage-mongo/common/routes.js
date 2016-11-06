/**
 * Created by ugo on 03/11/16.
 */


const Routes = [{
    prefix: '/api/v1/outfitss',
    pin: 'role:outfits,cmd:*',
    map: {
        read: {name: '', GET: true, suffix: '/{id}'},
        list: {name: '', GET: true},
        create: {name: '', POST: true},
        update: {name: '', POST: true, suffix: '/{id}'},
        delete: {name: '', 'DELETE': true, suffix: '/{id}'}
    }
}]