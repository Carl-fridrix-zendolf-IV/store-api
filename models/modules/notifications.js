var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Notifications = new keystone.List('Notifications', {
    hidden: true
});

var generateOrderNumber = () => {
    return (Math.random() * (999999 - 100000) + 100000).toFixed();
}

Notifications.add({
    message: { type: String, required: true, initial: true },
    headings: { type: String, initial: true, label: 'Title' },
    url: { type: String, initial: true },
    app_page: { type: String, label: 'Application page', initial: true },
    number: { type: Number, initial: true, noedit: true, nodelete: true, index: {unique: true} }
});

Notifications.register();
