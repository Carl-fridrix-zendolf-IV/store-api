var keystone = require('keystone'),
    User = keystone.list('User');

exports = module.exports = function(done) {
    new User.model({
        name: { first: 'Admin', last: 'User' },
        email: 'admin@keystonejs.com',
        password: 'admin',
        phone: 79000000000,
        canAccessKeystone: true
    }).save(done);
};
