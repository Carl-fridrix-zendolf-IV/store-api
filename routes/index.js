const keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);


// Token secret word
exports.SECRET_WORD = 'JL4pRcWy';

// One signal for custormers
exports.ONE_SIGNAL_CUSTOMERS_APP_ID = '9be93636-2bde-44e3-a322-54d287d4f90c';
exports.ONE_SIGNAL_CUSTOMERS_API_KEY = 'ZTA0MDljNTMtNTgxZC00YjNjLTgzOTctMzNhMzE0NTM0Y2Yz';

// One signal for professionals
exports.ONE_SIGNAL_PROFESSIONALS_APP_ID = '7a3b9893-8baa-4586-b707-af3ba288ba4e';
exports.ONE_SIGNAL_PROFESSIONALS_API_KEY = 'MmRmZTcwNmUtNGQwYy00YzhkLTkyNjQtNzE5MjVkMDRiODc1';


// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('routes', middleware.tokenAuthentication);

keystone.pre('render', middleware.flashMessages);

// Handle 404 errors
keystone.set('404', (req, res, next) => {
    res.status(404).json({result: "Error", message: 'Page not found'});
});

// Handle other errors
keystone.set('500', (err, req, res, next) => {
    console.log(err);

    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});

// Load Routes
var routes = {
    views: importRoutes('./views')
};

// Bind Routes
exports = module.exports = (app) => {
    /**
    * @apiDefine ResponseError
    *
    * @apiError {String} result Result string.
    * @apiError {String} message Error message.
    */

    /**
    * @apiDefine ResponseSuccess
    *
    * @apiSuccess {String} result Result string.
    * @apiSuccess {String} message Success message.
    */

    /**
    * @apiDefine OrdersListSucces
    *
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id Order MongoDB id.
    * @apiSuccess {String} data.name Order unique ID for mobile apps.
    * @apiSuccess {Date} data.statusChangeDate Date of last change status request.
    * @apiSuccess {String} data.route Route string.
    *
    * @apiSuccess {Object} data.address Delivery object.
    * @apiSuccess {String} data.address.country Delivery country.
    * @apiSuccess {String} data.address.name Building Name.
    * @apiSuccess {String} data.address.postcode Delivery postcode.
    * @apiSuccess {String} data.address.number PO Box / Shop
    * @apiSuccess {String} data.address.state Delivery state.
    * @apiSuccess {String} data.address.street1 Delivery street.
    * @apiSuccess {String} data.address.street2 Delivery Address 2
    * @apiSuccess {String} data.address.suburb Delivery suburb.
    * @apiSuccess {Number[]} data.address.geo Delivery longitude and latitude.
    *
    * @apiSuccess {String} data.notes Order notes.
    * @apiSuccess {Object[]} data.products List of products.
    *
    * @apiSuccess {Object} data.status Status description.
    * @apiSuccess {String} data.status._id Status id.
    * @apiSuccess {String} data.status.name Status name.
    * @apiSuccess {Number} data.status.number Status number.
    *
    * @apiSuccess {Date} data.createdAt Order create date.
    * @apiSuccess {Object} data.payment Payment description.
    * @apiSuccess {String} data.payment._id Payment id.
    * @apiSuccess {String} data.payment.name Payment name.
    * @apiSuccess {Number} data.payment.number Payment number.
    *
    * @apiSuccess {Object} data.customer Customer info.
    * @apiSuccess {Object} data.professional Professional info.
    */

    // ************ API ROUTING CODE STARTS HERE ******************
    app.get('/', (req, res) => {
        return res.json({result: 'Success', message: 'Welcome to awesome butler hero API'})
    });

    app.get('/keystone/users', (req, res) => {
        console.log('******* request to "/keystone/users"')
    });

    app.get('/chat/detail', (req, res) => {
        let obj = {name: 'Support', id: '123456789', avatarURL: '', roomID: req.query.room.toString()}

        res.cookie('cookie_logininfo', JSON.stringify(obj));
        res.redirect(302, 'https://butler-hero.org/spika/#main');
    });

    app.get('/chats', routes.views.chats.chatslist);

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
    * @api {post} /api/public/v0/facebook/auth Auth new user with Facebook ID
    * @apiName Facebook authentication
    * @apiGroup Common
    *
    * @apiParam {String} token Facebook access token.
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id User ID.
    * @apiSuccess {String} data.auth-token Authentication token.
    * @apiSuccess {Boolean} data.phone_verified Authentication token.
    *
    * @apiUse ResponseError
    */
    app.post('/api/public/v0/facebook/auth', routes.views.api.facebookAuth);

    /**
    * @api {post} /api/public/v0/facebook/registration Registrate new user with Facebook ID
    * @apiName Facebook registration
    * @apiGroup Common
    *
    * @apiParam {String} token Facebook access token.
    * @apiParam {Boolean} professional User professional property.
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id User ID.
    * @apiSuccess {String} data.auth-token Authentication token.
    *
    * @apiUse ResponseError
    */
    app.post('/api/public/v0/facebook/registration', routes.views.api.facebookRegistration);

    /**
    * @api {post} /api/public/v0/user/registration Request for new user registration
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
    * @apiParam {Object} avatar avatar image file
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
    * @apiSuccess {Boolean} data.reviewed User reviewed property
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

    /**
    * @api {get} /api/public/v0/store/categories Get categories list [DEPRECATED]
    * @apiName Categories list [DEPRECATED]
    * @apiGroup Store
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String} [page] Filter by page.
    * @apiParam {String} [page_limit] Maximum elements by page (Default - 10, Max: 50).
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {String} total Total count of category items.
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id Category id.
    * @apiSuccess {String} data.name Category name.
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/store/categories', routes.views.api.categories);

    /**
    * @api {get} /api/public/v0/store/skills Get skills list
    * @apiName Skills list
    * @apiGroup Store
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String} [skip] Filter for skiping elements.
    * @apiParam {String} [limit] Filter for limiting data array (Default: 999999).
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {String} total Total count of products.
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id Category id.
    * @apiSuccess {String} data.name Product name.
    * @apiSuccess {String} data.price Product price.
    * @apiSuccess {String} data.description Product description.
    * @apiSuccess {String} data.image Link to product image.
    * @apiSuccess {String} data.icon Link to product icon.
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/store/skills', routes.views.api.products);

    app.get('/files/:file', routes.views.api.images);

    /**
    * @api {get} /api/public/v0/orders/payments Get Payment types
    * @apiName Payment types
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {Object[]} data Data object
    * @apiSuccess {String} data._id Payment ID.
    * @apiSuccess {String} data.name Payment name.
    * @apiSuccess {Number} data.number Payment number.
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/orders/payments', routes.views.api.paymentsTypes);

    /**
    * @api {get} /api/public/v0/orders/statuses Get statuses list
    * @apiName Statuses list
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {Object[]} data Data object
    * @apiSuccess {String} data._id Status ID.
    * @apiSuccess {String} data.name Status name.
    * @apiSuccess {Number} data.number Status number.
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/orders/statuses', routes.views.api.statusTypes);

    /**
    * @api {get} /api/public/v0/orders/history Get orders history
    * @apiName Orders history
    * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String} limit Limit array length.
    * @apiParam {String} skip Skip objects.
    *
    * @apiUse ResponseSuccess
    * @apiUse OrdersListSucces
    *
    * @apiUse ResponseError
    */

    /**
    * @api {get} /api/public/v0/orders/active Get active orders
    * @apiName Active orders
    * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String} limit Limit array length.
    * @apiParam {String} skip Skip objects.
    *
    * @apiUse ResponseSuccess
    * @apiUse OrdersListSucces
    *
    * @apiUse ResponseError
    */

    /**
    * @api {get} /api/public/v0/orders/pending Get pending orders
    * @apiName Pending orders
    * @apiDescription This method filtering orders list for customers and professional automatically. If request from customer you will get all your orders history. If request from professional you will get all your orders history and all orders with status "Active".
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String} limit Limit array length.
    * @apiParam {String} skip Skip objects.
    *
    * @apiUse ResponseSuccess
    * @apiUse OrdersListSucces
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/orders/:status', routes.views.api.ordersList);

    /**
    * @api {get} /api/public/v0/orders/by/:id Get order by id
    * @apiName Order by ID
    *
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    * @apiUse OrdersListSucces
    *
    * @apiUse ResponseError
    */
    app.get('/api/public/v0/orders/by/:id', routes.views.api.ordersList);

    /**
    * @api {put} /api/public/v0/orders/create Create order
    * @apiName Create order
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiParam {String[]} products List of product ids.
    * @apiParam {String} customer_id Customer ID.
    * @apiParam {Object} addr Delivery address.
    * @apiParam {String} addr.country Country.
    * @apiParam {Number[]} addr.geo Delivery longitude and latitude.
    * @apiParam {String} addr.name Building Name.
    * @apiParam {String} addr.number PO Box / Shop
    * @apiParam {String} addr.postcode Postcode
    * @apiParam {String} addr.state State
    * @apiParam {String} addr.street1 Street Address
    * @apiParam {String} addr.street2 Street Address 2
    * @apiParam {String} addr.suburb Suburb
    * @apiParam {String} payment_type Payment type ID
    * @apiParam {String} note Order note
    *
    * @apiUse ResponseSuccess
    * @apiSuccess {Object} data Data object
    * @apiSuccess {String} data._id Order id.
    *
    * @apiUse ResponseError
    */
    app.put('/api/public/v0/orders/create', routes.views.api.createOrder);

    /**
    * @api {patch} /api/public/v0/orders/status/:order_id/active Change order status to active
    * @apiName Status to active
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    /**
    * @api {patch} /api/public/v0/orders/status/:order_id/pending Change order status to pending
    * @apiName Status to pending
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    /**
    * @api {patch} /api/public/v0/orders/status/:order_id/reject Change order status to reject
    * @apiName Status to reject
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    /**
    * @api {patch} /api/public/v0/orders/status/:order_id/cancel Change order status to cancel
    * @apiName Status to cancel
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    /**
    * @api {patch} /api/public/v0/orders/status/:order_id/complete Change order status to complete
    * @apiName Status to complete
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    app.patch('/api/public/v0/orders/status/:order_id/:status', routes.views.api.changeStatus);

    /**
    * @api {patch} /api/public/v0/orders/route/:order_id Change order route
    * @apiName Change order route
    * @apiGroup Orders
    *
    * @apiHeader {String} Authorization User authorization token.
    * @apiParam {Object[]} route User route string
    *
    * @apiUse ResponseSuccess
    *
    * @apiUse ResponseError
    */
    app.patch('/api/public/v0/orders/route/:order_id', routes.views.api.routeChange);

    /**
     * @api {get} /api/public/v0/services/grades Get grades list
     * @apiName Grades list
     * @apiGroup Services
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Grade ID.
     * @apiSuccess {String} data.name Grade name.
     * @apiSuccess {Number} data.price Grader price.
     * @apiSuccess {Number} data.index Grader index.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/services/grades', routes.views.api.gradesList);

    /**
     * @api {get} /api/public/v0/services/languages Get languages list
     * @apiName Languages list
     * @apiGroup Services
     *
     * @apiUse ResponseSuccess
     * @apiSuccess {Object[]} data Data object
     * @apiSuccess {String} data._id Grade ID.
     * @apiSuccess {String} data.name Grade name.
     * @apiSuccess {Number} data.index Grader index.
     *
     * @apiUse ResponseError
     */
    app.get('/api/public/v0/services/languages', routes.views.api.languagesList);
};
