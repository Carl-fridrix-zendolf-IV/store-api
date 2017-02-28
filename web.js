var keystone = require('keystone');
keystone.init({

    'name': 'Butler Hero',

    'port': 3000,

    'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': ['public'],

    'views': 'templates/views',
    'view engine': 'jade',

    'auto update': true,

    'mongo': 'mongodb://localhost:27017/butler',

    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': 'ep8&nBQQm9'

});

require('./models');

keystone.set('routes', require('./routes'));

keystone.start();
