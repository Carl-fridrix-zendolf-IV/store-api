var keystone = require('keystone'),
    Status = keystone.list('Statuses');

exports = module.exports = function(done) {
    let promises = [
        new Promise((resolve, reject) => {
            new Status.model({
                name: "Pending",
                number: 0
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Status.model({
                name: "Active",
                number: 1
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Status.model({
                name: "Rejected",
                number: 2
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Status.model({
                name: "Cancelled",
                number: 3
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Status.model({
                name: "Completed",
                number: 0
            }).save(resolve())
        })
    ]

    Promise.all(promises).then(data => {
        done();
    })
};
