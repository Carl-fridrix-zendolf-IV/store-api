var keystone = require('keystone'),
    Notifications = keystone.list('Notifications');

exports = module.exports = function(done) {
    new Notifications.model({
        message: "Someone needs your help around you",
        headings: "Need help!",
        url: null,
        app_page: null,
        number: 105
    }).save(done);
};
