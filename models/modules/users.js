var keystone = require('keystone'),
    Types = keystone.Field.Types,
    uniqueValidator = require('mongoose-unique-validator'),
    path = require("path"),
    temp_dir = path.join('../temp/');


// Create user model
var User = new keystone.List('User', {
    defaultColumns: 'name, professional, phone, phone_verified',
    map: { name: 'phone', unique: true },
    map: { name: 'name' }
});

var avatarStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: temp_dir,
        publicPath: '/files',
    },
});

// TODO: Add avatar, grade relation and language relation (only for proff) multiple select
User.add({
    name: { type: Types.Name, required: true, index: true, initial: true },
    phone: { type: String, required: true, index: true, initial: true, unique: true },
    email: { type: Types.Email, initial: false, required: false },

    // ver 2.0 update
    avatar: { type: Types.File, storage: avatarStorage },
    rating: { type: Types.Number, default: 0, noedit: true },
    grades: { type: Types.Relationship, ref: 'Grades', many: true, dependsOn: { professional: true } },
    languages: { type: Types.Relationship, ref: 'Languages', many: true, dependsOn: { professional: true } },
    skills: { type: Types.Relationship, ref: 'Products', many: true, dependsOn: { professional: true } },

    password: { type: Types.Password, required: true, initial: true },
    passCode: { type: String, hidden: true },
    facebook_id: { type: String, hidden: true },
    professional: { type: Boolean, index: true, initial: true, dependsOn: {canAccessKeystone: false}, label: 'Professional' },
    phone_verified: { type: Boolean, label: 'Phone validated?' },
    user_active: { type: Boolean, default: true, label: 'User active' },
    canAccessKeystone: { type: Boolean, initial: true, default: false, label: 'Admin', dependsOn: {professional: false} },
    reviewed: { type: Boolean, initial: true, default: false, dependsOn: {professional: true}},
    push_sended: { type: Boolean, default: false, hidden: true },
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
