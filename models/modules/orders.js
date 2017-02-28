var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Order = new keystone.List('Orders');

Order.add({
    name: { type: String, required: true, index: true, initial: true, noedit: true },
    status: { type: Types.Relationship, ref: 'Statuses', many: false, required: true, initial: true },
    products: { type: Types.Relationship, ref: 'Products', many: true, required: true, initial: true, noedit: true, nodelete: true},
    customer_id: { type: Types.Relationship, ref: 'User', filters: { professional: false }, many: false, required: true, initial: true, label: 'Customer', noedit: true, nodelete: true},
    prof_id: { type: Types.Relationship, ref: 'User', filters: { professional: true }, many: false, label: 'Professional'},
    addr: { type: Types.Location, label: 'Address' },
    payment_type: { type: Types.Relationship, ref: 'Payments', many: false, required: true, initial: true, label: 'Payment type'},
    note: { type: String, default: '' },
    createdAt: { type: Types.Datetime, default: Date.now, label: 'Date', noedit: true},
    summary: { type: Number, noedit: true, nodelete: true },
    statusChangeDate: { type: Types.Datetime, hidden: true },
    route: { type: String, hidden: true }
});

Order.register();
