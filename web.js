// Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
// console.log(require.cache);

var keystone = require('keystone');
keystone.init({

    'name': 'Butler Hero',

    'port': 3000,

    // 'port': 9001,
    // 'host': "127.0.0.1",

    // 'ssl': true,
    // 'ssl port': 443,
    // 'ssl key': "../../../etc/nginx/keys/butler-hero.org.key",
    // 'ssl cert': "../../../etc/nginx/keys/butler-hero.org.crt",

    'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': ['public'],

    'views': 'templates/views',
    'view engine': 'jade',

    'auto update': true,

    // 'mongo': 'mongodb://localhost:27017/butler',
    // 'mongo': 'mongodb://Admin:32mVzz@localhost:27017/test',
    'mongo': 'mongodb://admin:32mVzz@ds135029.mlab.com:35029/heroku_vk5npqrw',

    'session': true,
    'auth': true,
    'user model': 'User',
    'cookie secret': 'ep8&nBQQm9'

});

require('./models');
keystone.set('routes', require('./routes'));
keystone.set( 'nav', {
    chats: [
        {
            label: "Chats list",
            key : "chats",
            path : "/chats"
        }
    ],
    content: ['users', 'categories', 'products', 'orders'],
    services: ['notifications', 'payments', 'statuses']
});

keystone.start();
