var keystone = require('keystone'),
    Types = keystone.Field.Types,
    path = require("path"),
    temp_dir = path.join('../temp/');


// Create category model
var Product = new keystone.List('Products', {
    defaultColumns: 'name, price, available',
    label: 'skills'
});

var iconStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: temp_dir,
        publicPath: '/files',
    },
});

var imageStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: temp_dir,
        publicPath: '/files',
    },
});


Product.add({
    name: { type: String, required: true, index: true, initial: true },
    description: { type: Types.Html, wysiwyg: true },
    // cat_id: { type: Types.Relationship, ref: 'Categories', label: 'Category', many: false, required: true, initial: true },
    price: { type: Types.Money, required: true, index: true, initial: true },
    available: { type: Boolean, default: true },
    // count: { type: Number, hidden: true },
    author: { type: Types.Relationship, ref: 'User', noedit: true, hidden: true },
    edit_at: { type: Types.Datetime, default: Date.now, label: 'Edit at', hidden: true },
    icon: { type: Types.File, storage: iconStorage },
    image: { type: Types.File, storage: imageStorage },
    map_icon: { type: Types.File, storage: imageStorage, label: 'Map icon' }
    // locations: { type: Types.Location }
});

Product.register();
