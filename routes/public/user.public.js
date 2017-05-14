module.exports = (app, routes) => {
    /**
     * @api {post} /api/public/v0/user/auth Request User authentication
     * @apiName User authentication
     * @apiGroup Common
     *
     * @apiParam {String} phone User phone (with +).
     * @apiParam {String} password User password.
     * @apiParam {Boolean} professional Professional property.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data.auth-token Authentication token.
     * @apiSuccess {String} data._id User ID.
     * @apiSuccess {Boolean} data.phone_verified User phone verify status.
     * @apiSuccess {Boolean} data.reviewed User reviewed property.
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/auth', routes.views.api.authentication);

    /**
     * @api {post} /api/public/v0/user/registration Create new user
     * @apiName User registration
     * @apiGroup Common
     *
     * @apiParam {Object} name Name Object
     * @apiParam {String} name.first User firstname.
     * @apiParam {String} name.last User lastname.
     * @apiParam {String} phone User phone with region code and plus character (ex. +79031234567).
     * @apiParam {String} email User email.
     * @apiParam {String} password User password.
     * @apiParam {Boolean} professional User password.
     * @apiParam {String[]} languages List languages id's
     * @apiParam {String[]} skills List of user skills (id's)
     * @apiParam {File} avatar avatar image file
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id User ID.
     * @apiSuccess {String} data.auth-token Authentication token.
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/registration', routes.views.api.registration);

    /**
     * @api {post} /api/public/v0/user/restore Request for user password restore
     * @apiName User password restore
     * @apiDescription This method CANCEL PHONE VERIFICATION!
     * @apiGroup Common
     *
     * @apiParam {String} phone User phone number (with +).
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data.newPassword New user password.
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/restore', routes.views.api.restore);

    /**
     * @api {post} /api/public/v0/user/generate/sms Request for sms generation
     * @apiName SMS generation
     * @apiGroup Common
     *
     * @apiParam {String} phone User phone number (with +).
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/generate/sms', routes.views.api.generateSMS);

    /**
     * @api {post} /api/public/v0/user/phone/verify Request for user phone verification
     * @apiName Phone verification
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     * @apiParam {String} pass_code Code from SMS.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/phone/verify', routes.views.api.phoneVerify);

    /**
     * @api {get} /api/public/v0/user/:id Request for user profile
     * @apiName User profile
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     * @apiParam {String} _id User ID.
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object} data Data object
     * @apiSuccess {String} data._id User id.
     * @apiSuccess {String} data.phone User phone.
     * @apiSuccess {String} data.email User email.
     * @apiSuccess {Boolean} data.phone_verified Status of user phone verification.
     * @apiSuccess {Boolean} data.professional Is user driver or not.
     * @apiSuccess {Object} data.name Name object
     * @apiSuccess {String} data.name.first User firstname.
     * @apiSuccess {String} data.name.last User lastname.
     * @apiSuccess {Object[]} data.addrs User addresses list
     * @apiSuccess {String} data.addrs.country Country.
     * @apiSuccess {Number[]} data.addrs.geo Delivery longitude and latitude.
     * @apiSuccess {String} data.addrs.name Building Name.
     * @apiSuccess {String} data.addrs.number PO Box / Shop
     * @apiSuccess {String} data.addrs.postcode Postcode
     * @apiSuccess {String} data.addrs.state State
     * @apiSuccess {String} data.addrs.street1 Street Address
     * @apiSuccess {String} data.addrs.street2 Street Address 2
     * @apiSuccess {String} data.addrs.suburb Suburb
     * @apiSuccess {Number[]} data.location User lat and long postion
     * @apiSuccess {Boolean} data.reviewed User reviewed property
     * @apiSuccess {Number} data.rating User rating
     * @apiSuccess {Object[]} data.skills User skills list
     * @apiSuccess {String} data.skills._id Skill ID
     * @apiSuccess {Number} data.skills.price Skill price
     * @apiSuccess {String} data.skills.name Skill name
     * @apiSuccess {String} data.skills.description Skill description
     * @apiSuccess {Object} data.skills.map_icon Skill map icon
     * @apiSuccess {String} data.skills.map_icon.filename Link to map icon filename
     * @apiSuccess {Object} data.skills.image Skill image object
     * @apiSuccess {String} data.skills.image.filename Link to skill icon filename
     * @apiSuccess {Object} data.skills.icon Skill icon object
     * @apiSuccess {String} data.skills.icon.filename Skill icon filename
     * @apiSuccess {String} data.skills.edit_at Last skill update date
     * @apiSuccess {Boolean} data.skills.available Skill available
     * @apiSuccess {Object[]} data.languages Languages list
     * @apiSuccess {String} data.languages._id Language id
     * @apiSuccess {Number} data.languages.index Language index
     * @apiSuccess {String} data.languages.name Language name
     * @apiSuccess {Object[]} data.grades Grades list
     * @apiSuccess {String} data.grades._id Grade id
     * @apiSuccess {Number} data.grades.index Grade index
     * @apiSuccess {String} data.grades.name Grade name
     * @apiSuccess {Object} data.avatar User avatar object
     * @apiSuccess {String} data.avatar.filename Link to user avatar
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/user/:id', routes.views.api.userProfile);

    /**
     * @api {patch} /api/public/v0/user/:id Request for user profile update
     * @apiName User profile update
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} firstname User firstname.
     * @apiParam {String} lastname User lastname.
     * @apiParam {Object} name User lastname.
     * @apiParam {String} name.first User firstname.
     * @apiParam {String} name.last User lastname.
     * @apiParam {String} phone User phone.
     * @apiParam {String} password User password.
     * @apiParam {String} email User email.
     * @apiParam {Boolean} reviewed User reviewed property
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.patch('/api/public/v0/user/:id', routes.views.api.userProfileUpdate);

    /**
     * @api {post} /api/public/v0/user/:id/address/add Add address
     * @apiName Add address
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} country Country.
     * @apiParam {Number[]} geo Delivery longitude and latitude.
     * @apiParam {String} name Building Name.
     * @apiParam {String} number PO Box / Shop
     * @apiParam {String} postcode Postcode
     * @apiParam {String} state State
     * @apiParam {String} street1 Street Address
     * @apiParam {String} street2 Street Address 2
     * @apiParam {String} suburb Suburb
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/:id/address/add', routes.views.api.addAddress);

    /**
     * @api {patch} /api/public/v0/user/:id/address/:addr_id Update address
     * @apiName Update address
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiParam {String} country Country.
     * @apiParam {Number[]} geo Delivery longitude and latitude.
     * @apiParam {String} name Building Name.
     * @apiParam {String} number PO Box / Shop
     * @apiParam {String} postcode Postcode
     * @apiParam {String} state State
     * @apiParam {String} street1 Street Address
     * @apiParam {String} street2 Street Address 2
     * @apiParam {String} suburb Suburb
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.patch('/api/public/v0/user/:id/address/:addr_id', routes.views.api.updateAddress);

    /**
     * @api {delete} /api/public/v0/user/:id/address/:addr_id Delete address
     * @apiName Delete address
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.delete('/api/public/v0/user/:id/address/:addr_id', routes.views.api.deleteAddress);

    /**
     * @api {post} /api/public/v0/user/location Add user location
     * @apiName User location
     * @apiGroup Common
     *
     * @apiHeader {String} Authorization User authorization token.
     * @apiParam {Number[]} location Longitude and latitude.
     *
     * @apiUse ResponseSuccess
     *
     * @apiUse ResponseError
     */
    app.post('/api/public/v0/user/location', routes.views.api.setLocation);


    app.patch('/api/public/v0/user/avatar', routes.views.api.uploadAvatar);
};