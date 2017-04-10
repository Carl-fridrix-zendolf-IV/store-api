Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
console.log(require.cache);


var keystone = require('keystone');
keystone.init({

    'name': 'Butler Hero',

    'port': 3000,

    // 'port': 9001,
    // 'host': "127.0.0.1",

    'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': ['public'],

    'views': 'templates/views',
    'view engine': 'jade',

    'auto update': true,
    
    'mongo': 'mongodb://admin:CV88FBNWCdBqA5cv@localhost:27017/store',
    // 'mongo': 'mongodb://admin:Vzz@ds135029.mlab.com:35029/heroku_vk5npqrw',

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
            label: "Support Chats",
            key : "chats",
            path : "/chats"
        }
    ],
    content: ['users', 'categories', 'products', 'orders'],
    services: ['notifications', 'payments', 'statuses']
});

keystone.start();
