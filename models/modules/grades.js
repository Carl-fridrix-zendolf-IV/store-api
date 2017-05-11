var keystone = require('keystone');

// Create category model
var Grade = new keystone.List('Grades', {
    hidden: false
});

Grade.add({
    name: { type: String, required: true, noedit: true, nodelete: true, initial: true },
    price: { type: Number, initial: true, default: 0 },
    index: { type: Number, required: true, noedit: true, nodelete: true, initial: true, index: {unique: true} }
});

Grade.register();
