var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Notifications = new keystone.List('Notifications', {
    hidden: false,
    map: { name: 'headings' },
    defaultColumns: 'headings, app_page',
});

var generateOrderNumber = () => {
    return (Math.random() * (999999 - 100000) + 100000).toFixed();
}

Notifications.add({
    message: { type: String, required: true, initial: true },
    headings: { type: String, initial: true, label: 'Title' },
    url: { type: String, initial: true },
    app_page: {
        type: Types.Select,
        label: 'Application page',
        numeric: true,
        initial: true,
        options: [
            { value: 1001, label: 'Orders history' },
            { value: 1002, label: 'Order' },
            { value: 1003, label: 'Order tracking' }
        ]
    },
    number: { type: Number, initial: true, noedit: true, nodelete: true, index: {unique: true} }
});

Notifications.register();
