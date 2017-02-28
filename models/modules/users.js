var keystone = require('keystone'),
    Types = keystone.Field.Types,
    uniqueValidator = require('mongoose-unique-validator');


// Create user model
var User = new keystone.List('User', {
    defaultColumns: 'name, professional, phone, phone_verified',
    map: { name: 'phone', unique: true },
    map: { name: 'name' }
});

User.add({
    name: { type: Types.Name, required: true, index: true, initial: true },
    phone: { type: String, required: true, index: true, initial: true, unique: true },
    email: { type: Types.Email, initial: false, required: false },
    password: { type: Types.Password, required: true, initial: true },
    passCode: { type: String, hidden: true },
    facebook_id: { type: String, hidden: true },
    professional: { type: Boolean, index: true, initial: true, dependsOn: {canAccessKeystone: false}, label: 'Professional' },
    phone_verified: { type: Boolean, label: 'Phone validated?' },
    user_active: { type: Boolean, default: true, label: 'User active' },
    canAccessKeystone: { type: Boolean, initial: true, default: false, label: 'Admin', dependsOn: {professional: false} },
    reviewed: { type: Boolean, initial: true, default: false, dependsOn: {professional: true} },
    location: { type: Types.NumberArray, hidden: false}
});

User.schema.add({
    addrs: {
        type: [{
            name: String,
            number: String,
            street1: String,
            street2: String,
            suburb: String,
            state: String,
            postcode: String,
            country: String,
            geo: Array
        }]
    }
});

User.schema.plugin(uniqueValidator);

User.register();
