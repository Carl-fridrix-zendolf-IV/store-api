var keystone = require('keystone'),
    Status = keystone.list('Statuses');

exports = module.exports = function(done) {
    new Status.model({
        name: "Not Found",
        number: 5
    }).save(done);
};
