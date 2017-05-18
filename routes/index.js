const keystone = require('keystone'),
    middleware = require('./middleware'),
    cors = require('cors'),
    importRoutes = keystone.importer(__dirname);


// Token secret word
exports.SECRET_WORD = 'JL4pRcWy';
exports.ADMIN_SECRET_WORD = 'es5NduEEVhDFJk4l';

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
keystone.pre('routes', middleware.internalTokenVerification);

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
    views: importRoutes('./views'),
    services: importRoutes('./services')
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
    * @apiSuccess {Object[]} data Data object
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
    * @apiSuccess {String} data.createdAt Order created date.
    *
    * @apiSuccess {Object} data.status Status description.
    * @apiSuccess {String} data.status._id Status id.
    * @apiSuccess {String} data.status.name Status name.
    * @apiSuccess {Number} data.status.number Status number.
    *
    * @apiSuccess {Object} data.payment Payment description.
    * @apiSuccess {String} data.payment._id Payment id.
    * @apiSuccess {String} data.payment.name Payment name.
    * @apiSuccess {Number} data.payment.number Payment number.
    *
    * @apiSuccess {Object} data.customer Customer info.
    * @apiSuccess {Object} data.professional Professional info.
    *
    * @apiSuccess {Number} data.duration During this time (minutes) order must be completed.
    * @apiSuccess {Object[]} data.skills List of skills.
    *
    * @apiSuccess {Object[]} data.languages List of languages.
    * @apiSuccess {Object[]} data.grades List of grades.
    * @apiSuccess {String[]} data.linked_orders_list List of copied orders, exclude current order.
    * @apiSuccess {Number} data.summary Summa of skills prices.
    * @apiSuccess {Number} data.leftDuration How much time passed from last status update (leftDuration = duration - current time + time of switch status)
    *
    */

    // ************ API ROUTING CODE STARTS HERE ******************
    app.use(cors());

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

    app.get('/files/:file', routes.views.api.images);

    // Require public modules
    require('./public/user.public')(app, routes); // all methods with users
    require('./public/facebook.public')(app, routes); // all methods with facebook auth
    require('./public/store.public')(app, routes); // all methods with store access
    require('./public/orders.public')(app, routes); // all methods with orders manipulations
    require('./public/services.public')(app, routes);

    // Require internal modules
    require('./internal/user.internal')(app, routes);
};