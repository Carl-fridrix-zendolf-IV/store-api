// Object.keys(require.cache).forEach(function(key) { delete require.cache[key] })
// console.log(process.env.ENV_VARIABLE, '<-- ENV_VARIABLE');

let port;
let mongo;

switch (process.env.ENV_VARIABLE) {
    case 'PRODUCTION':
        port = 9000;
        mongo = 'mongodb://admin:CV88FBNWCdBqA5cv@localhost:27017/store';
        break;
    case 'TEST':
        port = 9001;
        mongo = 'mongodb://admin:CV88FBNWCdBqA5cv@localhost:27017/test';
        break;
    case 'DEV':
        port = 9002;
        mongo = 'mongodb://admin:CV88FBNWCdBqA5cv@localhost:27017/test';
        break;
    case 'LOCAL':
        port = 3000;
        mongo = 'mongodb://localhost:27017/butler';
        break;
    default:
        port = 9000;
        mongo = 'mongodb://admin:CV88FBNWCdBqA5cv@localhost:27017/store';
        break;
}

console.log('\n');
console.log(port, '<-- Keystone API port');
console.log(mongo, '<-- Keystone Mongo url', '\n');

process.env.PORT = port;

var keystone = require('keystone');
keystone.init({
    'name': 'Butler Hero',

    'port': port,
    'host': "127.0.0.1",

    'favicon': 'public/favicon.ico',
    'less': 'public',
    'static': ['public'],

    'views': 'templates/views',
    'view engine': 'jade',

    'auto update': true,

    'mongo': mongo,

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
    content: ['users', 'products', 'orders'],
    skills: ['notifications', 'payments', 'statuses', 'grades', 'languages']
});

keystone.start();

// import Spika
require('./spika/src/server/main')();
