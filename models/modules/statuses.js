var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Status = new keystone.List('Statuses', {
    hidden: true
});

Status.add({
    name: { type: String, required: true, noedit: true, nodelete: true, initial: true },
    number: { type: Number, noedit: true, nodelete: true, initial: true }
});

Status.register();
