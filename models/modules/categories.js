var keystone = require('keystone'),
    Types = keystone.Field.Types;

// Create category model
var Category = new keystone.List('Categories', {
    hidden: true
});

Category.add({
    name: { type: String, required: true, index: true, initial: true },
    small_description: { type: String, hidden: true },
    available: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now, noedit: true, hidden: true },
    author: { type: Types.Relationship, ref: 'User', noedit: true, hidden: true }
});

Category.register();
