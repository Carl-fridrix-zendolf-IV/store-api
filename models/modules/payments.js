var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Payment = new keystone.List('Payments', {
    hidden: true
});

Payment.add({
    name: { type: String, required: true, noedit: true, nodelete: true, initial: true },
    number: { type: Number, noedit: true, nodelete: true, initial: true }
});

Payment.register();
