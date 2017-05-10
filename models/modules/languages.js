var keystone = require('keystone');

// Create category model
var Language = new keystone.List('Languages', {
    hidden: false
});

Language.add({
    name: { type: String, required: true, noedit: true, nodelete: true, initial: true },
    index: { type: Number, required: true, noedit: true, nodelete: true, initial: true, index: {unique: true} }
});

Language.register();
