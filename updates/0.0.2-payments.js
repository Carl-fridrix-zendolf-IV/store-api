var keystone = require('keystone'),
    Payment = keystone.list('Payments');

exports = module.exports = function(done) {
    let promises = [
        new Promise((resolve, reject) => {
            new Payment.model({
                name: "Cash",
                number: 0
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Payment.model({
                name: "Card",
                number: 1
            }).save(resolve())
        }),
        new Promise((resolve, reject) => {
            new Payment.model({
                name: "PayPal",
                number: 2
            }).save(resolve())
        })
    ]

    Promise.all(promises).then(data => {
        done();
    })
};
