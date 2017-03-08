var keystone = require('keystone'),
    Notifications = keystone.list('Notifications');

exports = module.exports = function(done) {
    let promises = [
        new Promise((resolve, reject) => {
            new Notifications.model({
                message: "Professional is here.",
                headings: "Professional arrive",
                url: null,
                app_page: null,
                number: 100
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Notifications.model({
                message: "Professional has begun to fulfill the order.",
                headings: "Professional get your order",
                url: null,
                app_page: null,
                number: 101
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Notifications.model({
                message: "Order was rejected by professional.",
                headings: "Order rejected",
                url: null,
                app_page: null,
                number: 102
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Notifications.model({
                message: "Order was canceled by client.",
                headings: "Order canceled",
                url: null,
                app_page: null,
                number: 103
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Notifications.model({
                message: "The order is complete.",
                headings: "Order complete",
                url: null,
                app_page: null,
                number: 104
            }).save(resolve())
        }),
    ]

    Promise.all(promises).then(data => {
        done();
    })
};
